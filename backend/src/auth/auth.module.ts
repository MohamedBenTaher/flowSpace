import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { accessTokenStrategy } from './strategies/access-token.strategy';
import { refreshTokenStrategy } from './strategies/refresh-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    accessTokenStrategy,
    refreshTokenStrategy,
    PrismaService,
    MailService,
  ],
})
export class AuthModule {}
