import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { DeleteTransactionParams } from "../../schemas/transaction.schema";

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "Matheus";
  const { id } = request.params;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      return reply.status(400).send({ error: "Transaction not found!" });
    }

    await prisma.transaction.delete({ where: { id } });
    reply.send({ message: "Transaction deleted successfully!" });
  } catch (err) {
    request.log.error("Error deleting transaction!", err);
    reply.status(500).send({ error: "Internal server error!" });
  }
};
