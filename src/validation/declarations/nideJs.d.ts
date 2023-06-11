declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: string;
    MONGODB_HOST: string;
    MONGODB_PORT: number;
    MONGODB_DATABASE: string;
  }
}
