import { Knex } from "knex";
export async function seed(knex: Knex) {
  const employeesSeedData = [
    { name: "Mykhailo", title: "The strongest in the history", tribe_id: 2},
    { name: "Ihor", title: "Just me", tribe_id: 1},
    { name: "Max", title: "Intern", tribe_id: 2},
  ];

  const tribesSeedData = [
    {
      name: "Internstellar",
      department: "FreshMeetPreparation",
    },
    {
      name: "Dark Magic",
      department: "Development",
    },
  ];
  
  await knex("tribes").insert(tribesSeedData);
  await knex("employees").insert(employeesSeedData);

}
