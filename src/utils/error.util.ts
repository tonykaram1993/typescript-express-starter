import Error from "../validation/types/Error.type";

const makeError = (
  status: number,
  message: string,
  errorCode?: number,
  stackTrace?: string
) => {
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

  return error;
};

export default makeError;
