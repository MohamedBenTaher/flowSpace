import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow ({
      where:{
        id:id
       }})
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
        id:id,
      },
    })
  }
}
