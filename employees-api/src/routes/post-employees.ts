import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { PostBodySchema, PostBodyType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "POST",
    url: "/api/employees",
    schema: {
      body: PostBodySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const newEmployee = request.body as PostBodyType;
      const post = await employeesModel.createEmployee(fastify, newEmployee);
      reply.code(201).send(post);
    },
  };
}
