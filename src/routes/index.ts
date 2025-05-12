import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
      message: "DevBills API rodando normalmente",
    });
  });
}

export default routes;
