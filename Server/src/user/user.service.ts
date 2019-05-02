import userModel from './user.model';


class UserService {
  private user = userModel;

  public getUsers = async () => {
    const users = await this.user.find({});
    for(let user of users) {
      await user.populate('topics').execPopulate();
    }
    return users;
  }
}

export default UserService;