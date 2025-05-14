import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes";

/**
 * Instância principal do servidor Fastify.
 */
const app: FastifyInstance = Fastify({
  logger: true, // Ativa logs detalhados
});

// Registro das rotas definidas em src/routes/index.ts
app.register(routes, { prefix: "/api" });

export default app;
