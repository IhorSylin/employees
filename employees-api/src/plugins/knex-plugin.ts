import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Knex } from "knex";
import getKnexInstance from "../db/knex";

async function knexPlugin(instance: FastifyInstance) {
  const knexInstance = getKnexInstance();
  instance.decorate("tars", knexInstance);
}

export default fp(knexPlugin, {
  name: "tars",
});

declare module "fastify" {
  interface FastifyInstance {
    tars: Knex;
  }
}
