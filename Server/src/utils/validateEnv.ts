import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
  console.log(process.env.PORT);
  cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
  });
};