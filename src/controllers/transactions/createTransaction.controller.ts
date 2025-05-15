import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { createTransactionSchema } from "../../schemas/transactions.schemas";

// Handler de criação de transação
const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  // Simulação de ID de usuário autenticado
  const userId = "FED$%DF%RDF";

  if (!userId) {
    reply.status(401).send({ error: "Usuário não autenticado" });
    return;
  }

  // Validação com Zod
  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.errors[0]?.message || "Validação inválida";
    reply.status(400).send({ error: errorMessage });
    return;
  }

  try {
    const transaction = result.data;

    // Verifica se a categoria existe e pertence ao tipo esperado
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      reply.status(400).send({ error: "Categoria inválida" });
      return;
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    console.error("Erro ao criar transação:", err);
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};

export default createTransaction;
