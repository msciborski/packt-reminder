import Topic from './topic.interface';
import topicModel from './topic.model';
import userModel from '../user/user.model';
import HttpException from '../exceptions/httpException';

class TopicService {
  public topic = topicModel;
  public user = userModel;

  public async addTopicsToUser(topics: string[], userId: string) {
    const unifiedTopics = topics.map(topic => ({ name: topic.toLowerCase() }));
    const addedTopics = await this.topic.insertMany(unifiedTopics);

    const user = await this.user.findById(userId);

    if (user) {
      const topicIds = addedTopics.map(topic => topic.id);
      user.topics.push(...topicIds);
      await user.save();

      return await user.populate('topics').execPopulate();
    } else {
      throw new HttpException(400, 'User not found.');
    }
  }

  public async removeTopicsFromUser(topicId: string, userId: string) {
    let user = await this.user.findById(userId);

    if (user) {
      user.topics = user.topics.filter(topic => topic._id !== topicId);
      user = await user.save();
      return await user.populate('topics').execPopulate();
    } else {
      throw new HttpException(400, 'User not found.');
    }

  }

}

export default TopicService;
