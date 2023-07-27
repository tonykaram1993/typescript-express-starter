// Types
import Error from "../validation/types/Error.type";

// Utils
import logger from "./logger.util";

type MakeErrorArguments = {
  status: number;
  message: string;
  logMessage?: string;
  errorCode?: number;
  stackTrace?: string;
};

const makeError = ({
  status,
  message,
  logMessage,
  errorCode,
  stackTrace,
}: MakeErrorArguments) => {
  const error: Error = {
    statusCode: status,
    message,
  };

  if (errorCode) {
    error.errorCode = errorCode;
  }

  if (stackTrace) {
    error.stack = stackTrace;
  }

  if (logMessage) {
    logger.error(logMessage);
  }

  return error;
};

export default makeError;
