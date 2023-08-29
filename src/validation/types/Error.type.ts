import { StatusCodes } from "http-status-codes";

type Error = {
    statusCode: number;
    message: string;
    stack?: string;
    errorCode?: StatusCodes;
};

export default Error;
