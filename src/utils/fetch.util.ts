import * as colorette from "colorette";

// Utils
import logger from "./logger.util";
import axios, { AxiosResponse } from "axios";

type FetchRequestMethod = "post" | "get" | "put" | "patch" | "delete";

type FetchWrapperArguments = {
  url: string;
  method: FetchRequestMethod;
  body?: any;
};

const fetchWrapper = async ({
  url,
  method,
  body,
}: FetchWrapperArguments): Promise<AxiosResponse> => {
  const requestStartTime = Date.now();

  const response = await axios[method](url, { method, body });
  logger.info("TKCL - response:", response);

  const requestDuration = (Date.now() - requestStartTime) / 1000;

  logger.info(
    `[${method.toUpperCase()}] ${colorette.blue(url)} - ${requestDuration} ms`
  );

  return response;
};

const fetchWithBody =
  (method: FetchRequestMethod) =>
  (args: Required<Pick<FetchWrapperArguments, "url" | "body">>) =>
    fetchWrapper({ method, ...args });

const fetchWithoutBody =
  (method: FetchRequestMethod) => (args: Pick<FetchWrapperArguments, "url">) =>
    fetchWrapper({ method, ...args });

const post = fetchWithBody("post");
const get = fetchWithoutBody("get");
const put = fetchWithBody("put");
const patch = fetchWithBody("patch");
const del = fetchWithBody("delete");

export default {
  post,
  get,
  put,
  patch,
  del,
};
