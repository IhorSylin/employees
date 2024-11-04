import { error } from "console";
import { destroyTestDb, generateTestDb } from "../test-data";
import getTestFastify from "./test-fastify";

const app = getTestFastify();

describe("GET /api/employees", () => {
   beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });
  
  /*     "employee_name" : "Albert the Second",
    "title": "Physicist",
    "tribe_id": "1"
    */
  it("should return new employee info", async () => {
    await app.inject({
      url: "/api/employees",
      method: "POST",
      body: {
        "employee_name" : "Albert the Second",
        "title": "Physicist",
        "tribe_id": "1"
      }
    });
    const res = await app.inject({
      url: "/api/employees/11",
      method: "GET",
    });

    const response = res.json();
    expect(response).toEqual({
      id: 11,
      name: "Albert the Second",
      title: "Physicist",
      tribe: {
        id: 1,
        name: "Internstellar",
        department: "Other Engineering",
      },
    });
  });


  it("should return new employee info", async () => {
    const res = await app.inject({
      url: "/api/employees",
      method: "POST",
      body: {
        "employee_name" : "Albert the Second",
        "title": "Physicist",
      }
    });
  const response = res.json();
  const statusCode = res.statusCode;

  expect(statusCode).toEqual(400);
  expect(response).toEqual(
    expect.objectContaining({
      error: "Bad Request",
    })
  );
  });
//   it("should return correct Employees DTO structure", async () => {
//     const res = await app.inject({
//       url: "/api/employees",
//       method: "GET",
//     });

//     const response = res.json();

//     expect(response[0]).toEqual({
//       id: 1,
//       name: "Cooper",
//       title: "Software Engineer",
//       tribe: {
//         id: 1,
//         name: "Internstellar",
//         department: "Other Engineering",
//       },
//     });
//   });

//   it("should filter by name", async () => {
//     const res = await app.inject({
//       url: "/api/employees?name=ha",
//       method: "GET",
//     });

//     const response = res.json();
//     expect(response).toHaveLength(2);
//   });

//   it("should filter by title", async () => {
//     const res = await app.inject({
//       url: "/api/employees?title=Designer",
//       method: "GET",
//     });

//     const response = res.json();
//     expect(response).toHaveLength(2);
//   });

//   it("should filter by tribe", async () => {
//     const res = await app.inject({
//       url: "/api/employees?tribe_name=Billing",
//       method: "GET",
//     });

//     const response = res.json();
//     expect(response).toHaveLength(4);
//   });
});