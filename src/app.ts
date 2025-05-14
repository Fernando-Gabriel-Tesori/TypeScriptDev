import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { env } from "./config/env";
import routes from "./routes";

/**
 * Instância principal do servidor Fastify.
 */
const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
  }, // Ativa logs detalhados
});

// Registro das rotas definidas em src/routes/index.ts
app.register(routes, { prefix: "/api" });

export default app;
