export type SignInDto = {
  userName:string;
  firstName:string;
  lastName:string;
  birthday:Date;
  email:string;
  phoneNumber?:string;
  password:string;
  gender:string;
  confirmPassword ?:string | null;
}