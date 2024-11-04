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
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const tribes = await tribesModel.getTribes(fastify);
      reply.send(tribes);
    },
  };
}


