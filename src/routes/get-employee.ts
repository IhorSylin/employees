import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { IdSchema, IdType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/:id",
    schema: {
      params:IdSchema
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      console.log("I am here")
      const { id } = request.params as IdType;
      const employee = await employeesModel.getEmployee(fastify, id);

      if(employee == null){
        reply.statusCode = 404
        reply.send("No employee found")
      } else {
        reply.send(employee);
      }
    },
  };
}
