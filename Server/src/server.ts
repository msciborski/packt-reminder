import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import AuthenticationController from './authentication/authentication.controller';
validateEnv();

const { PORT } = process.env;
const app = new App([
  new AuthenticationController(),
], PORT);
app.listen();