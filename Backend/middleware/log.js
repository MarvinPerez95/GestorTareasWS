import fs from 'fs';
import path from 'path';

// Ruta del archivo de logs
const logPath = path.resolve('logs', 'app.log');

// Asegura que el directorio de logs exista
if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
}

export function logMiddleware(req, res, next) {
    const now = new Date().toISOString();
    const log = `[${now}] ${req.method} ${req.originalUrl} - IP: ${req.ip}\n`;
    fs.appendFile(logPath, log, err => {
        if (err) console.error('Error escribiendo log:', err);
    });
    next();
}

export function logError(err, req, res, next) {
    const now = new Date().toISOString();
    const log = `[${now}] ERROR: ${err.stack || err}\n`;
    fs.appendFile(logPath, log, e => {
        if (e) console.error('Error escribiendo log de error:', e);
    });
    next(err);
}
