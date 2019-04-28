import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './user/user.controller';
import TopicController from './topic/topic.controller';

validateEnv();

const { PORT } = process.env;
const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new TopicController(),
  ],
  parseInt(PORT)
);
app.listen();