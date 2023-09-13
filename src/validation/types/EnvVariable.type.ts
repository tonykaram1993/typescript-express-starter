import globalsConfig from "../../configs/globals.config";

type EnvVariablesEnum = keyof typeof globalsConfig.ENV_VARIABLES;

export default EnvVariablesEnum;
