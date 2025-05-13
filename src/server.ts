import dotenv from "dotenv";
import app from "./app";

// Carrega variáveis do .env
dotenv.config();

// Porta padrão ou fallback
const PORT = Number(process.env.PORT) || 3333;

/**
 * Inicializa o servidor Fastify
 */
const startServer = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

startServer();
