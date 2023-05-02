import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    try {
      return this.prisma.post.create({ data: createPostDto });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.prisma.post.findMany();
  }
  async findMany(cursor?: Prisma.PostWhereUniqueInput) {
    const limit = 10;
    const where = cursor.id ? { id: { gt: cursor.id } } : {};

    const posts = await this.prisma.post.findMany({
      where,
      orderBy: { id: 'asc' },
      take: limit,
    });

    const nextId = posts.length ? posts[posts.length - 1].id : null;

    return {
      data: posts,
      nextId,
      previousId: posts.length > limit ? posts[posts.length - limit]?.id : 0,
    };
  }

  findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
