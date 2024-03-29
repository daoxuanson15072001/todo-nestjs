import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    password : string ;
}