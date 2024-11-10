import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { IdSchema, IdType, PostBodySchema, PostBodyType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "PATCH",
    url: "/api/employees/:id",
    schema: {
      params: IdSchema,
      body: PostBodySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as IdType;
      const updatedEmployee = request.body as PostBodyType;
      const post = await employeesModel.updateEmployee(fastify, updatedEmployee, id);
      fastify.tars
    },
  };
}
