import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response) {
    const status = error.status || 500;
    const message = error.message || 'Unexcepted error occured';

    response
      .status(status)
      .send({
        status,
        message,
      });
};

export default errorMiddleware;