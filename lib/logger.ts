/**
 * Centralized logging utility
 * Only logs in development mode to avoid console pollution in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  isDevelopment: boolean;
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      isDevelopment: process.env.NODE_ENV === 'development',
      ...config,
    };
  }

  private formatMessage(level: LogLevel, message: string, prefix?: string): string {
    const timestamp = new Date().toISOString();
    const logPrefix = prefix || this.config.prefix || '';
    return `[${timestamp}] [${level.toUpperCase()}]${logPrefix ? ` [${logPrefix}]` : ''} ${message}`;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.config.isDevelopment) {
      console.log(this.formatMessage('debug', message), ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.config.isDevelopment) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(this.formatMessage('error', message), ...args);
  }

  // Create a child logger with a specific prefix
  child(prefix: string): Logger {
    return new Logger({ ...this.config, prefix });
  }
}

// Export singleton instances for common use cases
export const logger = new Logger();
export const nasaLogger = logger.child('NASA API');
export const renderLogger = logger.child('3D Render');
export const performanceLogger = logger.child('Performance');

export default logger;
