import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class StudentReviewDto {
    @IsNotEmpty()
    subjectId: number;
  
    @IsNotEmpty()
    studentId: number;
  
    
    @IsNotEmpty()
    isAccept: boolean;


  }
  