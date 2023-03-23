import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from './constants';
import { Tokens } from './types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(private readonly prisma :PrismaService,
    private readonly jwtService:JwtService){

  }
  hashData(data:string){
    return bcrypt.hash(data,10)
  }
  async getTokens(userId:number,email:string):Promise<Tokens>{
    const [accessToken,refreshToken]=await Promise.all([
    this.jwtService.signAsync({
      sub:userId,
      email,
    },{
      secret:jwtConstants.secret,
      expiresIn: 60*15,
    }),
    this.jwtService.signAsync({
      sub:userId,
      email,
    },{
      secret:jwtConstants.secret,
      expiresIn: 60*60*24*7,
    })
  ])
  return {
    access_token:accessToken,
    refresh_token:refreshToken
  }
  }
  
  async register(authDto:CreateUserDto):Promise<Tokens> {
    const hash=await this.hashData(authDto.password)
    authDto.hash=hash;
    const newUser=await this.prisma.user.create({data:authDto});
    const tokens=await this.getTokens(newUser.id,newUser.email)
    return tokens;
  }

  signInLocal() {
    return `This action returns all auth`;
  }

  logout(id: number) {
    return `This action returns a #${id} auth`;
  }

  refreshTokens() {
    return `This action updates a  auth`;
  }

}
