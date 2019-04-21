import * as express from 'express';
import Controller from "../interfaces/controller.interface";
import validationMiddleware from '../middlewares/validation.middleware';
import RegisterUserDto from '../user/user.dto';
import userModel from '../user/user.model';
import LoginDto from './authentication.dto';
import AuthenticationService from './authentication.service';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  public authenticationService = new AuthenticationService();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
    }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
      const userData: RegisterUserDto = request.body;
      try {
        await this.authenticationService.register(userData);
        response.sendStatus(201);
      } catch (error) {
        next(error);
      }
    }

    private login = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const loginData: LoginDto = request.body;

      try {
        const {
          tokenData,
          user,
        } = await this.authenticationService.login(loginData);

        response.send({
          tokenData,
          user,
        });
      } catch (error) {
        next(error);
      }
    }
}

export default AuthenticationController;