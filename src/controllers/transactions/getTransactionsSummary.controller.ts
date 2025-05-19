import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { getTransactionsSummaryQuery } from "../../schemas/transaction.schema";

dayjs.extend(utc);

const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: getTransactionsSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "Matheus";
  const { month, year } = request.query;

  if (!month || !year) {
    return reply.status(400).send({ error: "Month and year are mandatory!" });
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
      },
      include: {
        category: { select: { name: true, color: true, type: true } },
      },
    });

    // Lógica de resumo fica aqui...

    reply.send(transactions); // Substitua com objeto final resumido
  } catch (err) {
    request.log.error("Error getting summary!", err);
    reply.status(500).send({ error: "Internal server error!" });
  }
};

export default getTransactionsSummary;
