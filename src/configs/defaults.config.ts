// Configs
import stringsConfig from "./strings.config";

// Default error status code and error message for when we do not want
// to tell the user what exactly happened or when something unexpected happens
const ERROR = {
    STATUS_CODE: 500,
    MESSAGE: stringsConfig.ERRORS.SOMETHING_WENT_WRONG,
};

const APP = {
    PORT: 5000, // port on which the express app runs
};

export default { ERROR, APP };
