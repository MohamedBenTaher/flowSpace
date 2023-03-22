import { CreatePostDto } from "src/post/dto/create-post.dto";
import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDto {
        @ApiProperty()
        userName    :string;
        @ApiProperty()
        firstName   :string;
        @ApiProperty()
        lastName    :string;
        @ApiProperty()
        bio         :string;
        @ApiProperty()
        birthday    :Date;
        @ApiProperty()
        email       :string;
        @ApiProperty()
        country     :string;
        @ApiProperty()
        city        :string;
        @ApiProperty()
        createdAt   :Date;
        @ApiProperty()
        updatedAt   :Date

}
