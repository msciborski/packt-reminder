import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';

validateEnv();

const { PORT } = process.env;
const app = new App([], PORT);
app.listen();