import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as tribesModel from "../models/tribes";
import { searchQuerySchema, searchQueryType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes",
    schema: {
      querystring: searchQuerySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const query = request.query as searchQueryType;
      // const employees = await tribesModel.getEmployees(fastify, query);
      reply.statusCode = 501
      reply.send("Feature is not implemented");
    },
  };
}
