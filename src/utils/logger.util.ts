import { createLogger, format, transports } from "winston";

// Configs
import globals from "../configs/globals.config";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Write to all logs with level `info` and below to `combined.log`.
    // Write all logs error (and below) to `error.log`.
    new transports.File({ filename: "src/logs/error.log", level: "error" }),
    new transports.File({ filename: "src/logs/combined.log" }),
  ],
});

// If we're not in production then **ALSO** log to the `console` with the
// colorized simple format.
if (process.env.NODE_ENV !== globals.ENVIRONMENTS.PRODUCTION) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.simple(),
        format.splat()
      ),
    })
  );
}

export default logger;
