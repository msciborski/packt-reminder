import userModel from './user.model';
import EmailSender from '../utils/emailSender';

class UserService {
  private user = userModel;
  private emailSender = new EmailSender();

  public getUsers = async () => {
    const users = await this.user.find({});
    for(let user of users) {
      await user.populate('topics').execPopulate();
    }
    return users;
  }

  public notifyUser = async (userId: any) => {
    const user = await this.user.findById(userId);
    const { email } = user;

    await this.emailSender.sendMail(email, 'We find book which can intrest you. Visit packt.');
  }


}

export default UserService;