import * as express from 'express';
import topicModel from './topic.model';
import TopicService from './topic.service';
import Controller from '../interfaces/controller.interface';

class TopicController implements Controller {
  public path = '';
  public router = express();
  public topicService = new TopicService();
  private topic = topicModel;

  constructor() {

  }

  private initializeRoutes() {

  }
}