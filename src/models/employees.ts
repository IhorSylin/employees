import { FastifyInstance } from "fastify";
import { searchQueryType } from "../routes/schemas";
import { Tribe, TRIBE_REPORT_CACHE_KEY } from "./tribes";

const TABLE_NAME = "employees";
const GET_EMPLOYEES_CACHE_KEY = "employeesList";

export interface Employee {
  id: number;
  employee_name: string;
  title: string;
  tribe_id: number;
}
export interface EmployeeDTO {
  id: number;
  employee_name: string;
  title: string;
  tribe: Tribe;
}

interface EmployeeQueryResult {
  id: number;
  employee_name: string;
  title: string;
  tribe_id: number;
  tribe_name: string;
  department: string;
}

const formatEmployeeDTO = (queryResult: EmployeeQueryResult): EmployeeDTO => {
  return {
    id: queryResult.id,
    employee_name: queryResult.employee_name,
    title: queryResult.title,
    tribe: {
      id: queryResult.tribe_id,
      tribe_name: queryResult.tribe_name,
      department: queryResult.department,
    },
  };
};

export async function createEmployee( //Ask about cache here
  fastify: FastifyInstance,
  employee: {
    employee_name: string,
    title: string,
    tribe_id: number 
  },
): Promise<Employee> { 
  await fastify.cache.del(GET_EMPLOYEES_CACHE_KEY);
  await fastify.cache.del(TRIBE_REPORT_CACHE_KEY);
  return await fastify.tars.from(TABLE_NAME).insert({
    employee_name: employee.employee_name,
    title: employee.title,
    tribe_id: employee.tribe_id
  });
}

export async function getEmployees(
  fastify: FastifyInstance,
  query: searchQueryType
): Promise<any> {
  const cache = await fastify.cache.get(GET_EMPLOYEES_CACHE_KEY);
  if (cache) {
    return JSON.parse(cache).map(formatEmployeeDTO);
  }

  const queryResult = fastify.tars
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      'employees.id' as 'id',
      'employees.employee_name' as 'name',
      'employees.title' as 'title',
      'employees.tribe_id' as 'tribe_id',
      'tribes.tribe_name' as 'tribe_name',
      'tribes.department' as 'department',
    );

  if (query.employee_name) queryResult.whereLike("employees.employee_name", `%${query.employee_name}%`);
  if (query.title) queryResult.whereLike("employees.title", `%${query.title}%`);
  if (query.tribe_name) queryResult.whereLike("tribes.tribe_name", `%${query.tribe_name}%`);

  const results = await queryResult.then();

  await fastify.cache.set(GET_EMPLOYEES_CACHE_KEY, JSON.stringify(results), { EX: 60 });

  return (await queryResult.then()).map(formatEmployeeDTO);
}

export async function getEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<EmployeeDTO | null> {
  const employee = await fastify.tars
  .from(TABLE_NAME)
  .innerJoin("tribes", "tribes.id", "employees.tribe_id")
  .where({ "employees.id": id })
  .select(
    'employees.id' as 'id',
    'employees.employee_name' as 'name',
    'employees.title' as 'title',
    'employees.tribe_id' as 'tribe_id',
    'tribes.tribe_name' as 'tribe_name',
    'tribes.department' as 'department',
  );
  if (employee.length == 0) return null;
  
  return formatEmployeeDTO(employee[0]);
}

export async function deletePost(
  fastify: FastifyInstance,
  id: number
): Promise<void> {
  await fastify.cache.del(TRIBE_REPORT_CACHE_KEY);
  await fastify.cache.del(GET_EMPLOYEES_CACHE_KEY);
  await fastify.tars.from(TABLE_NAME).where({ id }).del();
}
