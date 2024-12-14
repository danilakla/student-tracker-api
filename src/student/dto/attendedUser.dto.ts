import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class UserAttendDto {
    @IsString()
    @IsNotEmpty()
    code: string;
  
    @IsString()
    @IsNotEmpty()
    time: string;

  }
  