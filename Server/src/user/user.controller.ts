import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import UserService from './user.service';
import HttpException from '../exceptions/httpException';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getUsers);
    this.router.post(`${this.path}/:id/notify`, this.notifyUser);
  }

  private getUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    try {
      const users = await this.userService.getUsers();
      response.send(users);
    } catch (err) {
      next(new HttpException(500, err));
    }
  }

  private notifyUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = request.params;
    try {
      await this.userService.notifyUser(id);
      response.sendStatus(200);
    } catch(err) {
      next(new HttpException(500, err));
    }
  }
}

export default UserController;