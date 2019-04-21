import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorHandling from './middlewares/error.middleware';
import 'dotenv/config';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers : Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandling);
  }

  private connectToDatabase() {
    const { MONGO_CONNECTION_STRING } = process.env;
    mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;