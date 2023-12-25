import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
