import { Injectable } from '@nestjs/common';
import { SubjectDto } from 'src/subject/dto/subject.dto';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class TeacherService {
    constructor(private subjectSerivce:SubjectService){

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

   
   async geManySubjects(subjectId: number, teacherId: number){
    try {
       return await this.subjectSerivce.getSubjects( teacherId);
        
    } catch (error) {
    throw error;        
    }    
}
}
