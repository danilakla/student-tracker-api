import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SubjectDto{
    @IsOptional()
    subjectId: number
    @IsString()
    @IsNotEmpty()
    subjectName: string
    @IsString()
    @IsNotEmpty()
    course: string
    @IsString()
    @IsNotEmpty()
    term: string
    @IsOptional()
    numberOfStudent: number
    @IsOptional()
    numberPassLecture: number
}