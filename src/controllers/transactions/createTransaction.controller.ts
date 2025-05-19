import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { CreateTransactionBody, createTransactionSchema } from "../../schemas/transaction.schema";

const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionBody }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "Matheus";

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    return reply.status(400).send({
      error: result.error.errors[0].message || "Invalid validation!",
    });
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      return reply.status(400).send({ error: "Invalid category!" });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: new Date(transaction.date),
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error("Error creating transaction!", err);
    reply.status(500).send({ error: "Internal server error!" });
  }
};

export default createTransaction;
