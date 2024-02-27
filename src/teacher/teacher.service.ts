import { BadRequestException, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectDto } from 'src/subject/dto/subject.dto';
import { SubjectService } from 'src/subject/subject.service';
import { StudentReviewDto } from './dto/StudentReview.dto';

@Injectable()
export class TeacherService {
    constructor(private prisma:PrismaService, private subjectSerivce:SubjectService,private cryptoService: CryptoService ){

    }
    async generateCodeForSubject(subjectId:number, liveTimeInSecond:number, teacherId:number){
      const subject =await  this.getOneSubject(subjectId, teacherId);
      if(subject==null) throw new BadRequestException()
      const timeNow= new Date();
      const secDataString= subject.id+"$"+timeNow.toString()+"$"+liveTimeInSecond;
      
      const encryptedData = this.cryptoService.encryptString(secDataString);
      return encryptedData;
   }


   async reviewStudent(studentReview:StudentReviewDto, teacherId: number){
      if(studentReview.isAccept){


        const data= await this.prisma.studentSubject.update({
            where:{
               studentId_subjectId:{
                  studentId:studentReview.studentId,
                  subjectId:studentReview.subjectId,
               },
               reviewStatus:true
            },
            data:{
               reviewStatus:false,
                  attendanceCount:{
                     increment:1
                  }
            }
         })
         return data;
      }else{

         const data= await this.prisma.studentSubject.update({
            where:{
               studentId_subjectId:{
                  studentId:studentReview.studentId,
                  subjectId:studentReview.subjectId,
               }
            },
            data:{
               reviewStatus:false,
      
            }
         })
         return data;
      }
   }
   async getSubjectWithReviewStudent(teacherId: number){
      const datas= await  this.prisma.studentSubject.findMany(
         {where:{
            subject:{
               teacherId:teacherId
            },   
            reviewStatus:true  
         },
         select:{
            
            subject:true
         }
      }
      )

      return datas;
   }

   async getReviewStudent(teacherId: number, subjectId:number){
      const datas= await  this.prisma.studentSubject.findMany(
         {where:{
            subject:{
               teacherId:teacherId,
            },   
            subjectId:subjectId,
            reviewStatus:true  
         },
         select:{
            subjectId:true,
            student:true
         }
      }
      )

      return datas;
   }

   async createSubject(subjectId:SubjectDto, teacherId: number){
    try {
       return await this.subjectSerivce.addSuject(subjectId, teacherId);
        
    } catch (error) {
    throw error;        
    }    
   }

   async updateSubject(subjectId:SubjectDto, teacherId: number){
    try {
       return await this.subjectSerivce.updateSubject(subjectId, teacherId);
        
    } catch (error) {
    throw error;        
    }    
   }

   async deleteSubject(subjectId: number, teacherId: number){
    try {
       return await this.subjectSerivce.deleteSubject(subjectId, teacherId);
        
    } catch (error) {
    throw error;        
    }    
   }


   async getOneSubject(subjectId: number, teacherId: number){
    try {
       return await this.subjectSerivce.getSubjectByTeacherSubjectId(subjectId, teacherId);
        
    } catch (error) {
    throw error;        
    }    
   }

   
   async getManySubjects( teacherId: number){
    try {
       return await this.subjectSerivce.getSubjects( teacherId);
        
    } catch (error) {
    throw error;        
    }    
}
}
