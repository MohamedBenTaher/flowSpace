import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  getCurrentUser,
  getCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Tokens } from './types';
import { confirmEmailDto } from './dto/auth-confirm-email.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { Response as ResponseType } from 'express';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/register')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() authDto: CreateUserDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<Tokens> {
    return this.authService.register(authDto);
  }

  @Public()
  @Post('/local/login')
  @HttpCode(HttpStatus.OK)
  async signInLocal(
    @Body() authDto: loginDto,
    @Res({ passthrough: true }) response: ResponseType,
  ): Promise<void> {
    {
      const tokens = await this.authService.signInLocal(authDto);
      response.cookie('access_token', tokens.access_token, {
        httpOnly: true, // prevent XSS attacks
        // secure: true, // only send over HTTPS
        maxAge: jwtConstants.access_token_expiration, // set expiration time
      });
      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        // secure: true,
        maxAge: jwtConstants.refresh_token_expiration,
      });
    }
  }

  @ApiBearerAuth()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @getCurrentUserId() userId: number,
    @Res({ passthrough: true }) response: ResponseType,
  ) {
    this.authService.logout(userId);
    response.cookie('access_token', '', {
      httpOnly: true, // prevent XSS attacks
      // secure: true, // only send over HTTPS
      expires: new Date(), // set expiration time
    });
    response.cookie('refresh_token', '', {
      httpOnly: true,
      // secure: true,
      expires: new Date(),
    });
  }

  @ApiBearerAuth()
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @getCurrentUserId() userId: number,
    @getCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: ResponseType,
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    response.cookie('access_token', tokens.access_token, {
      httpOnly: true, // prevent XSS attacks
      // secure: true, // only send over HTTPS
      maxAge: jwtConstants.access_token_expiration, // set expiration time
    });
    response.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: true,
      maxAge: jwtConstants.refresh_token_expiration,
    });
  }

  @Public()
  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() token: confirmEmailDto) {
    return this.authService.confirmEmail(token);
  }
  @Public()
  @Post('/email/forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() email: forgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }
  @Public()
  @Post('/email/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPassword: resetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }
}
