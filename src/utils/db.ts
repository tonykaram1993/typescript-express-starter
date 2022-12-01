import mongoose, { ConnectOptions } from "mongoose";
import logger from "./logger";

mongoose.connection.on("connected", () => {
  logger.info(`Connected to MongoDb! [${getMongoUrl()}]`);
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

  await mongoose.connect(mongoUrl, connectionOptions);
};

export default {
  connect,
};
