import { IsString } from "class-validator";

export class CreateUniverDto{
    @IsString()
    univerName: string 
}