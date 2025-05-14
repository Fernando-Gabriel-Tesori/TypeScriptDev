import app from "./app";
import { env } from "./config/env";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";
// Carrega variáveis do .env

// Porta padrão ou fallback
const PORT = env.PORT;

/**
 * Inicializa o servidor Fastify
 */
const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

startServer();
