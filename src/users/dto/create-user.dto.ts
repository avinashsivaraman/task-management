import { IsNotEmpty, IsIn, IsEmail } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

}