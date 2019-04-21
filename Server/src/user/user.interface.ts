import * as mongoose from 'mongoose';
import Topic from '../topic/topic.interface';

interface User extends mongoose.Document{
  email: string,
  password: string,
  topics: Topic[],
};

export default User;