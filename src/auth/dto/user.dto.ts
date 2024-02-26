import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    
    @IsString()
    @IsNotEmpty()
    role: string;

    @IsOptional()

    firstName: string;

    @IsOptional()

    lastName: string;

    @IsOptional()
    teacherSecretKey: string;

    @IsOptional()
    studentNumber: string;
  }
  