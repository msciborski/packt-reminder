import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/httpException';
import Controller from "../interfaces/controller.interface";
import validationMiddleware from '../middlewares/validation.middleware';
import RegisterUserDto from '../user/user.dto';
import userModel from '../user/user.model';
import LoginDto from './authentication.dto';
import User from '../user/user.interface';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import { JsonWebTokenError } from 'jsonwebtoken';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register}`, validationMiddleware(RegisterUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
      const userData: RegisterUserDto = request.body;
      if (await this.user.findOne({ email: userData.email })) {
        next(new HttpException(400, 'User with this email exists.'));
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
          ...userData,
          password: hashedPassword,
        });
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      }
    }

    private login = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const loginData: LoginDto = request.body;
      const user = await this.user.findOne({ email: loginData.email });

      if (user) {
        const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);

        if (isPasswordMatch) {
          user.password = undefined;
          const tokenData = this.createToken(user);
          response.setHeader('Set-Cookie', [this.createCookie(tokenData)])
          response.send(user);
        } else {
          next(new HttpException(400, 'Wrong credentials'));
        }
      } else {
        next(new HttpException(400, 'Wrong credentials'));
      }
    }

    private loggingOut = (request: express.Request, response: express.Response, next: express.NextFunction) => {
      response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
      response.sendStatus(200);
    }

    private createToken(user: User) : TokenData {
      const expiresIn = 60 * 60;
      const secret = process.env.JWT_SECRET;
      const dataStoredInToken: DataStoredInToken = {
        _id: user._id,
      };

      return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
      };
    }

    private createCookie(tokenData: TokenData) {
      return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default AuthenticationController;