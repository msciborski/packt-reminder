import * as nodemailer from 'nodemailer';
import { host } from 'envalid';

const {
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_ADDRESS,
} = process.env;

class EmailSender {
  private user: string = EMAIL_USER;
  private pass: string = EMAIL_PASSWORD;

  constructor(user: string, pass: string) {
    this.user = user;
    this.pass = pass;
  }

  private createTransporter = () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  public sendMail = async (to: string, message: string, from: string = EMAIL_ADDRESS, subject: string = 'Collect free book') => {
    const transprter = this.createTransporter();
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: message,
    };

    await transprter.sendMail(mailOptions)
  }
}

export default EmailSender;
