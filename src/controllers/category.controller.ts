// src/controllers/categoryController.ts
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";

type Category = {
  id: string;
  name: string;
};

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return reply.status(200).send({
      success: true,
      data: categories,
    });
  } catch (err) {
    request.log.error("Error when searching categories!", err);

    return reply.status(500).send({
      success: false,
      message: "Internal server error while fetching categories",
      error: process.env.NODE_ENV === "development" ? err : undefined,
    });
  }
};
