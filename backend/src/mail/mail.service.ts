import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailData } from './interfaces/mail-data.inteface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string; username: string }>) {
    const url = `example.com/auth/confirm?token=${mailData.data}`;

    await this.mailerService.sendMail({
      to: mailData.to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Weclome to FLowSpace!, confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: mailData.data.username,
        url: `${this.configService.get('FRONTEND_DOMAIN')}/auth/confirm/${
          mailData.data.hash
        }`,
      },
    });
  }
}
