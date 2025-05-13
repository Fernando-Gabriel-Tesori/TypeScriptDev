import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Banco de dados conectado com sucesso");
  } catch (err) {
    console.error("🚨 Falha ao conectar ao banco de dados:", err);
    process.exit(1);
  }
};

export default prisma;
