import * as bcrypt from 'bcrypt';
import * as express from 'express';
import Controller from "../interfaces/controller.interface";
import userModel from '../users/user.model';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();



}