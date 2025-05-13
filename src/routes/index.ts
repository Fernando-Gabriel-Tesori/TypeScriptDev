import type { FastifyInstance } from "fastify";

/**
 * Define as rotas principais da API.
 */
async function routes(fastify: FastifyInstance): Promise<void> {
  // Rota de verificação de saúde da API
  fastify.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
      message: "DevBills API rodando normalmente",
    });
  });
}

export default routes;
