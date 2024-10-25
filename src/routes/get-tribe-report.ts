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
    url: "/api/report",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const tribeReport = await tribesModel.getTribeReport(fastify);
      reply.send(tribeReport);
    },
  };
}
