export class SignInDto{
  userName:string='';
  firstName:string='';
  lastName:string='';
  birthday:Date=new Date();
  email:string='';
  phoneNumber:string='';
  password:string='';
  gender:string='';
  confirmPassword:string|null ='';
}