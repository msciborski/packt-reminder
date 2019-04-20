import App from './app';
import 'dotenv/config';

const { PORT } = process.env;
const app = new App([], PORT);
app.listen();