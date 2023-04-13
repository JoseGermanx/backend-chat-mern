import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import sendGridMail from '@sendgrid/mail';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { config } from '@configs/configEnvs';
import { BadRequestError } from '@helpers/errors/badRequestError';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = logger.createLogger('mailOptions');

class MailTransport {
  public async sendMail(receiverEmail: string, subject: string, body: string): Promise<void> {
    if (config.NODE_ENV === 'test' || config.NODE_ENV === 'development') {
      this.developmentEmailSender(receiverEmail, subject, body);
    } else {
      this.productionEmailSender(receiverEmail, subject, body);
    }
  }

  private async developmentEmailSender(receiverEmail: string, subject: string, body: string) {
    const transporter: Mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD
      }
    });

    // mail options object

    // try/catch
  }

  private async productionEmailSender(receiverEmail: string, subject: string, body: string) {
    //
  }
}

export const mailTransport: MailTransport = new MailTransport();
