import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async userInformation(request: Request) {
    const token = request.cookies['access_token'];
    const secret = process.env.secretJwt;
    const decodedToken = jwt.verify(token, secret);
    console.log('decodedToken', decodedToken);
    const userId = Number(decodedToken.sub);
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
