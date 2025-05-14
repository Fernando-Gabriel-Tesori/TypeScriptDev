import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import createTransaction from "../controllers/transactions/createTransaction.controller";

// 📌 Schema de validação para a criação de transação
const createTransactionSchema = {
  body: {
    type: "object",
    required: ["amount", "type", "description"],
    properties: {
      amount: { type: "number", minimum: 0.01 },
      type: { type: "string", enum: ["credit", "debit"] },
      description: { type: "string", minLength: 1, maxLength: 255 },
    },
    additionalProperties: false,
  },
} as const;

type CreateTransactionBody = FromSchema<typeof createTransactionSchema.body>;

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: CreateTransactionBody;
  }>({
    method: "POST",
    url: "/",
    schema: {
      body: createTransactionSchema.body,
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            amount: { type: "number" },
            type: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: createTransaction,
  });
};

export default transactionRoutes;
