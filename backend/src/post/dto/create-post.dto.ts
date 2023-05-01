import { IsBoolean, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  // @Min(4)
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;
}
