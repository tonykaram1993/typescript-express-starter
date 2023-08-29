export type FetchRequestMethod = "post" | "get" | "put" | "patch" | "delete";

export type FetchWrapperArguments = {
    url: string;
    method: FetchRequestMethod;
    body?: any;
};
