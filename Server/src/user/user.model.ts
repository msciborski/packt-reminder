import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  topics: [{
      ref: 'Topic',
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    }],
});

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;