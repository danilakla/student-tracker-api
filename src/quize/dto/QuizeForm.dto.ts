import { IsJSON, IsString } from "class-validator";

export class QuizeForm{
    @IsString()
    
    name
    
    @IsJSON()
    formtest:any
}