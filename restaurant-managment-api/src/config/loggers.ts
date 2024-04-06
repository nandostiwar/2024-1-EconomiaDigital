import winston from "winston";

class LoggerSingleton {
  // define attributes
  logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize()
      ),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }

  getLogger() {
    return this.logger;
  }
}

// Create a single instance of LoggerSingleton
const loggerSingleton = new LoggerSingleton();

// Export the getLogger method to access the logger instance
export const getLogger = loggerSingleton.getLogger.bind(loggerSingleton);

