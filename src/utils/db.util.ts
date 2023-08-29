import mongoose, { ConnectOptions } from "mongoose";

// Utils
import logger from "./logger.util";
import stringsConfig from "../configs/strings.config";

mongoose.connection.on("connected", () => {
    logger.info(
        `${stringsConfig.MESSAGES.CONNECTED_TO_MONGODB} [${getMongoUrl()}]`
    );
});

const getMongoUrl = () => {
    const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } = process.env;

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
