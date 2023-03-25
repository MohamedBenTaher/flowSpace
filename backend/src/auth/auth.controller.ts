import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, HttpCode, HttpStatus,UseGuards ,Req} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { getCurrentUser, getCurrentUserId, Public } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Tokens } from './types';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() authDto:CreateUserDto):Promise<Tokens>{
    return this.authService.register(authDto)
  }
  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() authDto:loginDto):Promise<Tokens>{
    {
      return this.authService.signInLocal(authDto)
    }
  }

  @ApiBearerAuth()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout (@getCurrentUserId() userId:number){
    return this.authService.logout(userId)
  }

  @ApiBearerAuth()
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@getCurrentUserId() userId:number,@getCurrentUser('refreshToken') refreshToken:string,){
    return this.authService.refreshTokens(userId,refreshToken)
  }
}
