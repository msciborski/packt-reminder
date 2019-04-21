import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import RequestWithUser from '../interfaces/rquestWithUser.interface';
import userModel from '../user/user.model';
import HttpException from '../exceptions/httpException';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  // const cookies = request.cookies;

  // if (cookies && cookies.Authorization) {
  //   const secret = process.env.JWT_SECRET;
  //   try {
  //     const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
  //     const id = verificationResponse._id;
  //     const user = await userModel.findById(id);

  //     if (user) {
  //       request.user = user;
  //       next();
  //     } else {
  //       next(new HttpException(401, 'Unathorized.'));
  //     }
  //   } catch (error) {
  //     next(new HttpException(401, 'Unathorized.'));
  //   }
  // } else {
  //   next(new HttpException(401, 'Unathorized.'));
  // }
}