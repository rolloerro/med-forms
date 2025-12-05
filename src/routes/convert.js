import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import { generatePdf } from '../services/pdfService.js';
import { logError } from '../utils/logger.js';

export default async function (fastify) {
  fastify.post('/', async (req, reply) => {
    try {
      const { template, data } = req.body;

      if (!template) {
        return reply.code(400).send({ error: 'template is required' });
      }

      const templatePath = path.join(process.cwd(), 'templates', template);

      if (!fs.existsSync(templatePath)) {
        return reply.code(404).send({ error: 'template not found' });
      }

      const html = fs.readFileSync(templatePath, 'utf8');

      // простой санитайзер
      if (html.includes('<script')) {
        return reply.code(400).send({ error: 'script tags are not allowed' });
      }

      const rendered = Mustache.render(html, data || {});

      const pdf = await generatePdf(rendered);

      reply
        .code(200)
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename="document.pdf"')
        .send(pdf);

    } catch (err) {
      await logError(err);
      return reply.code(500).send({ error: 'internal_error', details: err.message });
    }
  });
}
