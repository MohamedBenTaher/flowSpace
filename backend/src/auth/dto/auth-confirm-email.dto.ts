import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class confirmEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
