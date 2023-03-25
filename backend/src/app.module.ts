import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';

@Module({
  imports: [
      PrismaModule
    , UserModule
    , PostModule,
      ConfigModule.forRoot({isGlobal: true}),
      AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,{
    provide:APP_GUARD,
    useClass:AccessTokenGuard
  }],
})
export class AppModule {}
