import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class RegisterDTO {

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}