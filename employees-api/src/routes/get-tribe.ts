import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as tribesModel from "../models/tribes";
import { IdSchema, IdType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes/:id",
    schema: {
      params:IdSchema
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as IdType;
      // const tribe = await tribesModel.getTribe(fastify, id);
      reply.statusCode = 501
      reply.send("Feature is not implemented");
      // if(employee == null){
      //   reply.statusCode = 404
      //   reply.send("No employee found")
      // } else {
      //   reply.send(employee);
      // }
    },
  };
}
