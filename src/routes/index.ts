import { FastifyInstance } from "fastify";

async function  routes(fastify: FastifyInstance) {
     fastify.get('/health', async()=>{
        return{
            status: 'ok',
            message: 'DevBills API rodando normalmente'
        }
     })
}

export default routes