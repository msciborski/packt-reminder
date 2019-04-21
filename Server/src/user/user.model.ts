import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;