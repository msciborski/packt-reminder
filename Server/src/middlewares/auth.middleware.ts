import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import RequestWithUser from '../interfaces/rquestWithUser.interface';
import userModel from '../user/user.model';
import HttpException from '../exceptions/httpException';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const headers = request.headers;

  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(headers.authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);

      if (user) {
        request.user = user;
        next();
      } else {
        next(new HttpException(401, 'Bad credentials'));
      }
    } catch (error) {
      next(new HttpException(401, 'Bad credentials'));
    }
  } else {
    next(new HttpException(401, 'Bad credentials'));
  }
}