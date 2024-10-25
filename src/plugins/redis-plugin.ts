import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as Redis from "redis";
async function redisPlugin(fastify: FastifyInstance) {
  const redisHost = process.env.REDIS_HOST ?? "localhost";
  const url = `redis://${redisHost}:6379`;
  console.log(`connecting to redis via ${url}`);
  const redis = Redis.createClient({ url });
  redis.connect();
  console.log(`📝 Redis connected\n`);
  fastify.decorate("cache", redis);
  fastify.addHook('onClose', (fastify: FastifyInstance, done) => {
    fastify.cache.disconnect();
    done();
  });
} 
export default fp(redisPlugin, {
  name: "cache",
});
declare module "fastify" {
  interface FastifyInstance {
    cache: ReturnType<typeof Redis.createClient>;
  }
}