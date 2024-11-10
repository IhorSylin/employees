import { FastifyInstance } from "fastify";
import { searchQueryType } from "../routes/schemas";

const TABLE_NAME = "tribes";
export const TRIBE_REPORT_CACHE_KEY = "report";
const GET_TRIBES_CACHE_KEY = "tribesList";

export interface Tribe {
  department: string;
  id: number;
  name: string;
}

export interface ReportDTO {
  [tribe_name: string]: {
    tribe_id: number;
    department: string;
    employees:{
      id: number
      employee_name: string;
      title: string;
    }[]
  };
}

interface reportQueryResult {
  tribe_name: string;
  tribe_id: number;
  department: string;
  employees:{
    id: number;
    employee_name: string;
    title: string;
  }[]
}

const formatReportDTO = (queryResult: reportQueryResult): ReportDTO => {
  return {
    [queryResult.tribe_name]: {
      tribe_id: queryResult.tribe_id,
      department: queryResult.department,
      employees: queryResult.employees
    }
  };
};



export async function getTribeReport(
  fastify: FastifyInstance
): Promise<any> {
  const cache = await fastify.cache.get(TRIBE_REPORT_CACHE_KEY);
  if (cache) {
    return JSON.parse(cache).map(formatReportDTO);
  }
  const queryResult = fastify.tars
  .from("tribes")
  .innerJoin("employees", "employees.tribe_id", "tribes.id")
  .select(
    fastify.tars.raw("tribes.tribe_name AS tribe_name, " + 
    "MIN(tribes.id) AS tribe_id, " +
    "MIN(tribes.department) AS department, " +
    "JSON_ARRAYAGG(JSON_OBJECT(" +
      "'id', employees.id, " +
      "'employee_name', employees.employee_name, " + 
      "'title', employees.title " + 
    ")) AS employees")
  )
  .groupBy("tribes.tribe_name");

  const result = await queryResult.then();

  await fastify.cache.set(TRIBE_REPORT_CACHE_KEY, JSON.stringify(result));

  return ((await queryResult.then()).map(formatReportDTO));
}



export async function getTribes(
  fastify: FastifyInstance
): Promise<any> {
  const cache = await fastify.cache.get(GET_TRIBES_CACHE_KEY);
  if (cache) {
    return JSON.parse(cache);
  }

  const queryResult = fastify.tars
    .from(TABLE_NAME)
    .select(
      'id' as 'id',
      'tribe_name' as 'name',
      'department' as 'department',
    );


  const results = await queryResult.then();

  await fastify.cache.set(GET_TRIBES_CACHE_KEY, JSON.stringify(results), { EX: 60 });

  return (await queryResult.then());
}

export async function getTribe(
  fastify: FastifyInstance,
  id: number
): Promise<Tribe | null> {
  const tribe = await fastify.tars
  .from(TABLE_NAME)
  .where({ "tribes.id": id })
  .select(
    'id' as 'id',
    'tribe_name' as 'name',
    'department' as 'department',
  );
  if (tribe.length == 0) return null;
  
  return tribe[0];
}