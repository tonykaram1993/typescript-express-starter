// Configs
import stringsConfig from "./strings.config";

const ERROR = {
  STATUS_CODE: 500,
  MESSAGE: stringsConfig.ERRORS.SOMETHING_WENT_WRONG,
};

const APP = {
  PORT: 5000,
};

export default { ERROR, APP };
