import type { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';
import transactionsRoutes from './transactions.routes';

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/health', async () => {
    return {
      status: 'Ok',
      message: 'DevBills API running normally ',
    };
  });
  fastify.register(categoryRoutes, { prefix: '/categories' });
  fastify.register(transactionsRoutes, { prefix: '/transactions' });
}

export default routes;
