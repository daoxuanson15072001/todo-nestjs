import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(6)
    oldPassword : string ;
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(6)
    newPassword : string ;
}