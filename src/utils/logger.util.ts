import { createLogger, format, transports } from "winston";

// Configs
import globalsConfig from "../configs/globals.config";
import settingsConfig from "../configs/settings.config";

// Utils
import getEnvVariable from "./getEnvVariable.util";

const NODE_ENV = getEnvVariable.single(globalsConfig.ENV_VARIABLES.NODE_ENV);

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
        new transports.File({
            filename: settingsConfig.ERROR.FILES.ERROR,
            level: "error",
        }),
        new transports.File({ filename: settingsConfig.ERROR.FILES.COMBINED }),
    ],
});

// If we're not in production then **ALSO** log to the `console` with the
// colorized simple format.
if (NODE_ENV !== globalsConfig.ENVIRONMENTS.PRODUCTION) {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.errors({ stack: true }),
                format.colorize(),
                format.simple(),
                format.splat(),
                format.timestamp(),
                format.printf(({ level, message, timestamp, stack }) => {
                    // Take only the hours, minutes, and seconds from the timestamp
                    const time = timestamp.slice(11, 19);

                    return `${time} ${level}: ${stack || message}`;
                })
            ),
        })
    );
}

export default logger;
