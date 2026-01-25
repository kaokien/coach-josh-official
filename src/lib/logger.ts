/**
 * Structured Logger for Production
 * 
 * Outputs JSON-formatted logs for easy parsing by log aggregators
 * (Vercel, Datadog, etc.)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: string | number | boolean | null | undefined;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

const isDev = process.env.NODE_ENV === 'development';

function formatLog(level: LogLevel, message: string, meta?: LogMeta): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
}

function log(level: LogLevel, message: string, meta?: LogMeta): void {
  const entry = formatLog(level, message, meta);

  // In development, use pretty printing
  if (isDev) {
    const emoji = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    }[level];

    console[level === 'debug' ? 'log' : level](
      `${emoji} [${level.toUpperCase()}] ${message}`,
      meta ? meta : ''
    );
    return;
  }

  // In production, output JSON for log aggregators
  const output = JSON.stringify(entry);

  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  debug: (message: string, meta?: LogMeta) => log('debug', message, meta),
  info: (message: string, meta?: LogMeta) => log('info', message, meta),
  warn: (message: string, meta?: LogMeta) => log('warn', message, meta),
  error: (message: string, meta?: LogMeta) => log('error', message, meta),

  // Convenience method for API routes
  api: (route: string, status: number, meta?: LogMeta) => {
    log(status >= 400 ? 'error' : 'info', `API ${route}`, {
      status,
      ...meta,
    });
  },
};

export default logger;
