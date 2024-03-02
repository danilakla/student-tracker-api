import { QuizeForm } from './dto/QuizeForm.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizeService {
    constructor(private prisma:PrismaService){

    }

    public async  saveQuizeForm( quize:QuizeForm, teacherId:number){
    try {
        const data = this.prisma.quizeForm.create({data:{
            form:quize.formtest,
            name:quize.name,
            teacher:{
                connect:{id:teacherId}
            }
        }})
        return data;
    } catch (error) {
        
    }
    }

    public async  getQuizeForm(name:string){
        try {
            const data = this.prisma.quizeForm.findFirst({where:{
                name:name
            }})
            return data;
        } catch (error) {
            
        }
        }
}
