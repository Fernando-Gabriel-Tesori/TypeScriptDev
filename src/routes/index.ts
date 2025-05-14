import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";

/**
 * Define as rotas principais da API.
 */
async function routes(fastify: FastifyInstance): Promise<void> {
  // Rota de verificação de saúde da API
  fastify.get("/health", async () => {
    return {
      status: "ok",
      message: "DevBills API rodando normalmente",
    };
  });

  fastify.register(categoryRoutes, { prefix: "/categories" });
}

export default routes;
