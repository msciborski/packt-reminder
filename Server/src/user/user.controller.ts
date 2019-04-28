import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from './user.model';
import TopicService from '../topic/topic.service';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private user = userModel;
  private topicService = new TopicService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

  }

}

export default UserController;