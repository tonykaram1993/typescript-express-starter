import mongoose, { ConnectOptions } from "mongoose";

// Helpers
import logger from "./logger.helper";
import envVariable from "./envVariable.helper";

// Configs
import stringsConfig from "../configs/strings.config";
import globalsConfig from "../configs/globals.config";

const [MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE] = envVariable.getMultiple([
    globalsConfig.ENV_VARIABLES.MONGODB_HOST,
    globalsConfig.ENV_VARIABLES.MONGODB_PORT,
    globalsConfig.ENV_VARIABLES.MONGODB_DATABASE,
]);

mongoose.connection.on("connected", () => {
    logger.info(
        `${stringsConfig.MESSAGES.CONNECTED_TO_MONGODB} [${getMongoUrl()}]`
    );
});

const getMongoUrl = () => {
    return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
};

const connect = async () => {
    const mongoUrl = getMongoUrl();
    const connectionOptions: ConnectOptions = {
        bufferCommands: true,
        autoCreate: true,
    };

    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl, connectionOptions);
};

export default {
    connect,
};
