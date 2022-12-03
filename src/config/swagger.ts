import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tryItOutEnabled: true,
  },
};

export default swaggerOptions;
