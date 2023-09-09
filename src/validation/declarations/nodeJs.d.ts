import globalsConfig from "../../configs/globals.config";

declare namespace NodeJS {
    interface ProcessEnv {
        [globalsConfig.ENV_VARIABLES.PORT]: number;
        [globalsConfig.ENV_VARIABLES.NODE_ENV]: string;
        [globalsConfig.ENV_VARIABLES.MONGODB_HOST]: string;
        [globalsConfig.ENV_VARIABLES.MONGODB_PORT]: number;
        [globalsConfig.ENV_VARIABLES.MONGODB_DATABASE]: string;
        [globalsConfig.ENV_VARIABLES.JWT_TOKEN_SECRET]: string;
        [globalsConfig.ENV_VARIABLES.JWT_REFRESH_TOKEN_SECRET]: string;
        [globalsConfig.ENV_VARIABLES.JWT_RESET_PASSWORD_TOKEN_SECRET]: string;
    }
}
