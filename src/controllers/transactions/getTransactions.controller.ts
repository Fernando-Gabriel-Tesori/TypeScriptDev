import type { FastifyReply, FastifyRequest } from "fastify";

export const getTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  // Sua lógica aqui
  reply.send({ message: "Transações retornadas com sucesso" });
};
