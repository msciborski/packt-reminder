import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
  });
};