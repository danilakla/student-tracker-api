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


    firstName: string;


    lastName: string;

    @IsOptional()
    teacherSecretKey: string;

    @IsOptional()
    studentNumber: string;
  }
  