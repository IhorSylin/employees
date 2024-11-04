import { Knex } from "knex";
export async function seed(knex: Knex) {
  const employeesSeedData = [
    { employee_name: "Mykhailo", title: "The strongest in the history", tribe_id: 2},
    { employee_name: "Ihor", title: "Just me", tribe_id: 1},
    { employee_name: "Max", title: "Intern", tribe_id: 2},
  ];

  const tribesSeedData = [
    {
      tribe_name: "Internstellar",
      department: "FreshMeetPreparation",
    },
    {
      tribe_name: "Dark Magic",
      department: "Development",
    },
  ];

  await knex("tribes").insert(tribesSeedData);
  await knex("employees").insert(employeesSeedData);

}
