import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";

export class MailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_MAIL,
        pass: process.env.PASSWORD_MAIL,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    const info = await this.transporter.sendMail({
      to: message.to.email,
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
      attachments: message.attachments,
    });

    console.log("Message sent: %s", info.messageId);
  }
}
