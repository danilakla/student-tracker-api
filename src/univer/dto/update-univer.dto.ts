import { IsString } from "class-validator";

export class UpdateUniverDto{
    @IsString()
    updatedUniverName: string 
}