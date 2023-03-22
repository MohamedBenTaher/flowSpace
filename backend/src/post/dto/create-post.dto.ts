import { CreateUserDto } from "src/user/dto/create-user.dto";


export class CreatePostDto {

    id:Number;
    title:string;
    content:string
    published:boolean;
    author:CreateUserDto;
    authorId:number
}