import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeesModel from "../models/employees";
import { IdSchema, IdType } from "./schemas";
import { error } from "console";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/:id",
    schema: {
      params:IdSchema
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {

      const { id } = request.params as IdType;
      const employee = await employeesModel.getEmployee(fastify, id);

      if(!employee){
        reply.code(404).send({error:'No employee with id ' + id + ' is found'});
      } else {
        reply.send(employee);
      }
    },
  };
}
