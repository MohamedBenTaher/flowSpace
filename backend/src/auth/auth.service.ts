import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { Tokens } from './types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { loginDto } from './dto/login.dto';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MailService } from 'src/mail/mail.service';
import { confirmEmailDto } from './dto/auth-confirm-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(authDto: CreateUserDto): Promise<Tokens> {
    const hash = await this.hashData(authDto.password);

    authDto.hash = hash;
    const confirmHash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    authDto.confirmHash = confirmHash;
    const newUser = await this.prisma.user.create({ data: authDto });
    await this.mailService.userSignUp({
      to: authDto.email,
      data: {
        hash: confirmHash,
        username: authDto.userName,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
    return tokens;
  }
  async signInLocal(authDto: loginDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: authDto.email,
      },
    });
    const passwordMatches = await bcrypt.compare(authDto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Wrong Password');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: undefined,
        },
      },
      data: {
        hashRt: undefined,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied');
    const rtMatches = bcrypt.compare(user.hashRt, refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async confirmEmail(hash: confirmEmailDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        confirmHash: hash.hash,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        confirmHash: null,
        statusId: 1,
      },
    });
  }

  // utils functions to be placed in a utils folder later
  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
