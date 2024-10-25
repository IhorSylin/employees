import Fastify from "fastify";
import knexPlugin from "../../src/plugins/knex-plugin";
import redisPlugin from "../../src/plugins/redis-plugin";
import routes from "../../src/routes";

export default function () {
  const testApp = Fastify();
  beforeAll(async () => {
    testApp.register(routes);
    testApp.register(knexPlugin);
    testApp.register(redisPlugin);
    await testApp.ready();
  });
  afterAll(() => testApp.close());
  return testApp;
}

jest.mock("redis", () => ({
    createClient: jest.fn().mockReturnValue({
      connect: jest.fn(),
      disconnect: jest.fn(),
      get: jest.fn().mockResolvedValue(undefined),
      set: jest.fn(),
      del: jest.fn(),
    }),
  }));