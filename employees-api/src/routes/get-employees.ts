import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { searchQuerySchema, searchQueryType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees",
    schema: {
      querystring: searchQuerySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const query = request.query as searchQueryType;
      const employees = await employeesModel.getEmployees(fastify, query);
      reply.send(employees);
    },
  };
}