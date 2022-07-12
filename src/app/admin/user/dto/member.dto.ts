import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class MemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password: string;
  @IsNotEmpty()
  status: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  birthday : string;
}
