import { FastifyInstance } from "fastify";

import deleteEmployee from "./delete-employee";
import getEmployee from "./get-employee";
import getEmployees from "./get-employees";
import postEmployees from "./post-employees";
import getTribes from "./get-tribes";
import getTribe from "./get-tribe";

export default async function (fastify: FastifyInstance) {
  fastify.route(getEmployee(fastify));
  fastify.route(getEmployees(fastify));
  fastify.route(postEmployees(fastify));
  fastify.route(deleteEmployee(fastify));
  fastify.route(getTribe(fastify));
  fastify.route(getTribes(fastify));
}
