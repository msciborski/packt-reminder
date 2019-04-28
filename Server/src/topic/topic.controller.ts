import * as express from 'express';
import topicModel from './topic.model';
import TopicService from './topic.service';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/rquestWithUser.interface';
import AddTopicDto from '../topic/addTopic.dto';
import HttpException from '../exceptions/httpException';
import authMiddleware from '../middlewares/auth.middleware';

class TopicController implements Controller {
  public path = '';
  public router = express();
  public topicService = new TopicService();
  private topic = topicModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(`${this.path}/:id/topics`, this.addTopicsToUser)
      .delete(`${this.path}/:id/topics/:topicId`, this.removeTopic);  
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
        const user = await this.topicService.addTopicsToUser(addTopicData.topics, id);
        response.send(user);
      }
    }

  private removeTopic = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { id, topicId } = request.params;

    if (id !== request.user.id) {
      next(new HttpException(401, 'Unathorized access'));
    } else {
      const user = await this.topicService.removeTopicsFromUser(topicId, id);
      response.send(user);
    }
  }
}

export default TopicController;