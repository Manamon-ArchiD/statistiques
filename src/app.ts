import Fastify from 'fastify';
import {matchRoutes} from "./routes/match.route";
import {storeRoutes} from "./routes/store.route";
import {summarizeRoutes} from "./routes/summarize.route";

const fastify = Fastify({ logger: { level: 'warn' } });

fastify.get('/stats', async (request, reply) => {
    return { message: 'Welcome to my statistique API!' };
});

fastify.register(matchRoutes);
fastify.register(storeRoutes);
fastify.register(summarizeRoutes);

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server running on http://localhost:3000/stats');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
