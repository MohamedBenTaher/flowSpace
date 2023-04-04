import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'common.confirmEmail',
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.hash
      } ${'common.confirmEmail'}`,
      template: 'activation',
      context: {
        title: 'common.confirmEmail',
        url: `${this.configService.get('app.frontendDomain')}/confirm-email/${
          mailData.data.hash
        }`,
        actionTitle: 'common.confirmEmail',
        app_name: this.configService.get('app.name'),
        text1: 'confirm-email.text1',
        text2: 'confirm-email.text2',
        text3: 'confirm-email.text3',
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'common.resetPassword',
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.hash
      } {'common.resetPassword')}`,
      template: 'reset-password',
      context: {
        title: 'common.resetPassword',
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        actionTitle: 'common.resetPassword',
        app_name: this.configService.get('app.name'),
        text1: 'reset-password.text1',
        text2: 'reset-password.text2',
        text3: 'reset-password.text3',
        text4: 'reset-password.text4',
      },
    });
  }
}
