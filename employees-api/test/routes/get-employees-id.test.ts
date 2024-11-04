import { destroyTestDb, generateTestDb } from "../test-data";
import getTestFastify from "./test-fastify";

const app = getTestFastify();


describe("GET /api/employees/:id", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should return Employee DTO by id", async () => {
    const res = await app.inject({
      url: "/api/employees/1",
      method: "GET",
    });
    const response = res.json();

    expect(response).toEqual({
      id: 1,
      name: "Cooper",
      title: "Software Engineer",
      tribe: {
        id: 1,
        name: "Internstellar",
        department: "Other Engineering",
      },
    });
  });

 
  it("should return 404 when no Employee found", async () => {
    const res = await app.inject({
      url: "/api/employees/420",
      method: "GET",
    });

    const response = res.json();
    const statusCode = res.statusCode;

    expect(statusCode).toEqual(404);
    expect(response).toEqual({
      error: "No employee with id 420 is found",
    });
  });

  it("should return validation error when id is not number", async () => {
    const res = await app.inject({
      url: "/api/employees/punk",
      method: "GET",
    });

    const response = res.json();
    const statusCode = res.statusCode;


    expect(statusCode).toEqual(400);
    expect(response).toEqual(
      expect.objectContaining({
        message: "params/id must be number",
      })
    );
  });
});
