import Fastify from 'fastify';
import dotenv from 'dotenv';
import convertRoute from './routes/convert.js';
import { logRequest } from './utils/logger.js';

dotenv.config();

const fastify = Fastify({ logger: false });

// лог всех запросов
fastify.addHook('onRequest', async (req, reply) => {
  await logRequest(req);
});

// маршруты
fastify.register(convertRoute, { prefix: '/convert' });

// старт
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3006, host: '0.0.0.0' });
    console.log('MED-FORMS running on port', process.env.PORT || 3006);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
