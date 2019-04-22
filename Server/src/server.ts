import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './user/user.controller';

validateEnv();

const { PORT } = process.env;
const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
  ],
  parseInt(PORT)
);
app.listen();