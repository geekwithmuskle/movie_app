import { IsEmail, IsString } from 'class-validator';

export class ForgotPassword {
  @IsString()
  @IsEmail()
  email: string;
}
