import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { GetTransactionsQuery } from "../../schemas/transaction.schema";

dayjs.extend(utc);

const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "Matheus";
  const { month, year, type, categoryId } = request.query;

  const filters: any = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) filters.type = type;
  if (categoryId) filters.categoryId = categoryId;

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: { select: { name: true, color: true, type: true } },
      },
    });

    reply.send(transactions);
  } catch (err) {
    request.log.error("Error getting transactions!", err);
    reply.status(500).send({ error: "Internal server error!" });
  }
};

export default getTransactions;
