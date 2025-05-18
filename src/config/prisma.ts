import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("🟢 Prisma connected successfully!");
  } catch (err) {
    console.error("🔴 Prisma connection failed:", err);
    process.exit(1);
  }
};

export default prisma;
