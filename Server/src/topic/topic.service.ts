import Topic from './topic.interface';
import topicModel from './topic.model';
import userModel from '../user/user.model';
import HttpException from '../exceptions/httpException';

class TopicService {
  public topic = topicModel;
  public user = userModel;

  public async addTopics(topics: string[], userId: string) {
    const unifiedTopics = topics.map(topic => topic.toLowerCase());

    const topicsAddedToDb: Topic[] = [];
    unifiedTopics.forEach(async (topic) => {
      const addedTopic = await this.topic.create({ name: topic });
      topicsAddedToDb.push(addedTopic);
    })

    const user = await this.user.findById(userId);

    if (user) {
      user.topics.push(...topicsAddedToDb);
      await user.save();

      return user;
    } else {
      throw new HttpException(400, 'User not found.');
    }
  }
}

export default TopicService;
