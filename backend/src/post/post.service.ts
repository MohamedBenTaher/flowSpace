import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  findAll() {
    return this.prisma.post.findMany();
  }
  async findMany(cursor?: Prisma.PostWhereUniqueInput) {
    const limit = 10;
    const where = cursor ? { id: { gt: cursor.id } } : {};

    const posts = await this.prisma.post.findMany({
      where,
      orderBy: { id: 'asc' },
      take: limit,
    });

    const nextCursor = posts.length ? posts[posts.length - 1].id : null;

    return { posts, nextCursor };
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
