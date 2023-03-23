import { ApiParam, ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsDate,
  } from 'class-validator';

export class CreateUserDto {
      
        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        @MaxLength(50)
        @MinLength(6)
        firstName   :string;
        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        @MaxLength(50)
        @MinLength(6)
        lastName    :string;
        
        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        @MaxLength(50)
        @MinLength(6)
        userName:string
        
        @ApiProperty()
        @IsOptional()
        @IsString()
        @MaxLength(250)
        @MinLength(6)
        bio         :string;
        
        @ApiProperty()
        @IsNotEmpty()
        @Type(() => Date)
        @IsDate()
        birthday    :Date;
        @ApiProperty()
        @IsNotEmpty()
        @IsEmail()
        email       :string;

        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        password      :string;

        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        country     :string;

        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        city        :string;

        @ApiProperty()
        @IsOptional()
        @Type(() => Date)
        @IsDate()
        createdAt   :Date;

        @ApiProperty()
        @IsOptional()
        @Type(() => Date)
        @IsDate()
        updatedAt   :Date

        @ApiProperty()
        @IsString()
        hash:string

        @ApiProperty()
        @IsString()
        hashRt:string


}
