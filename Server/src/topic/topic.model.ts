import * as mongoose from 'mongoose';
import Topic from './topic.interface';

const topicSchema = new mongoose.Schema({
  name: String,
});

const topicModel = mongoose.model<Topic>('Topic', topicSchema);

export default topicModel;