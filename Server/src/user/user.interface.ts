import * as mongoose from 'mongoose';


interface User extends mongoose.Document{
  email: string,
  password: string,
};

export default User;