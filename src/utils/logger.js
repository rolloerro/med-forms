import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

export async function logRequest(req) {
  const line = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFileSync(path.join(logsDir, 'requests.log'), line);
}

export async function logError(err) {
  const line = `${new Date().toISOString()} ERROR ${err.message}\n`;
  fs.appendFileSync(path.join(logsDir, 'errors.log'), line);
}
