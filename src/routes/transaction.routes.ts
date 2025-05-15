import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { createTransactionSchema, getTransactionsSchema } from "../schemas/transactions.schemas";

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });
};

export default transactionRoutes;
