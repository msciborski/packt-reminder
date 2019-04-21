import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import RegisterUserDto from '../user/user.dto';
import User from '../user/user.interface';
import userModel from '../user/user.model';
import HttpException from '../exceptions/httpException';
import LoginDto from './authentication.dto';
import TopicService from '../topic/topic.service';

class AuthenticationService {
  public user = userModel;
  public topicService = new TopicService();

  public async register(userData: RegisterUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new HttpException(400, 'User exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      email: userData.email,
      password: hashedPassword,
    });
    const userWithTopics = await this.topicService
                      .addTopics(userData.topics, user._id);
    return userWithTopics;
  }

  public async login(loginData: LoginDto) {
    const user = await this.user.findOne({ email: loginData.email });
    if (!user) {
      throw new HttpException(400, 'User not found.');
    }

    const isPasswordMath = await bcrypt.compare(loginData.password, user.password);

    if (isPasswordMath) {
      user.password = undefined;
      const tokenData: TokenData = this.createToken(user);

      return {
        tokenData,
        user,
      };
    } else {
      throw new HttpException(400, 'Invalid credentials');
    }
  }

  private createToken(user: User) : TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthenticationService;