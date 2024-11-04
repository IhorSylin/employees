import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { IdType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "DELETE",
    url: "/api/employees/:id",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as IdType;
      await employeesModel.deletePost(fastify, id);
      reply.code(200).send("Deleted!");
    },
  };
}
