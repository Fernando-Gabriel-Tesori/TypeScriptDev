import app from "./app";
import { env } from "./config/env";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const startServer = async () => {
  try {
    await prismaConnect();
    await initializeGlobalCategories();
    await app.listen({ port: env.PORT });
    console.log(`🚀 Server is running at port ${env.PORT}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
