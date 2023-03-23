import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/register')
  register(@Body() authDto:CreateUserDto):Promise<Tokens>{
    return this.authService.register(authDto)
  }

  @Post('/local/signin')
  signInLocal(){
    {
      return this.authService.signInLocal()
    }
  }

  @Post('/logout')
  logout(@Param('id',ParseIntPipe) id:number){
    return this.authService.logout(id)
  }

  @Post('/refresh')
  refreshTokens(){
    return this.authService.refreshTokens()
  }
}
