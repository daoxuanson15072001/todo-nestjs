import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    password : string ;
}