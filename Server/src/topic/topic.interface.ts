import * as mongoose from 'mongoose';

interface Topic extends mongoose.Document {
  name: string;
}

export default Topic;