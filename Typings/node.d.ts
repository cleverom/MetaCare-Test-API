declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'Production' | 'staging' | 'development';
    DATABASE_URL: string;
    PORT: string;
  }
}