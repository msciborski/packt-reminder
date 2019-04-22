import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from './user.model';
import RequestWithUser from '../interfaces/rquestWithUser.interface';
import authMiddleware from '../middlewares/auth.middleware';
import HttpException from '../exceptions/httpException';
import TopicService from '../topic/topic.service';
import AddTopicDto from '../topic/addTopic.dto';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private user = userModel;
  private topicService = new TopicService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(`${this.path}/:id/topics`, this.addTopicsToUser);
  }

  private addTopicsToUser = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction ) => {
      const addTopicData : AddTopicDto = request.body;
      const { id } = request.params;
      if (id !== request.user.id) {
        next(new HttpException(401, 'Unathorized access'));
      } else {
        const user = await this.topicService.addTopics(addTopicData.topics, id);
        response.send(user);
      }
    }
}

export default UserController;