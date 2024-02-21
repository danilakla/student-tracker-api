import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { SubjectDto } from 'src/subject/dto/subject.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('teacher')
@UseGuards(JwtGuard)
export class TeacherController {
    
    constructor(private teacherService:TeacherService){}

    @Post("create-subject")
    async createSubject(
      @GetUser('id') teacherId: number,
      @Body() dto: SubjectDto,
    ) {


      return await this.teacherService.createSubject(dto, teacherId);
    }

    
    @Put("update-subject")
    async updateSubject(
      @GetUser('id') teacherId: number,
      @Body() dto: SubjectDto,
    ) {
      return await this.teacherService.updateSubject(dto, teacherId);
    }


      
    @Delete("delete-subject/:subjectId")
    async deleteSubject(
        @Param() params: any,
      @GetUser('id') userId: number
    ) {
        
      return await this.teacherService.deleteSubject(+params.subjectId,userId);
    }

    @Get("one-subject/:subjectId")
    async getOneSubject(
        @Param() params: any,
      @GetUser('id') userId: number
    ) {
      return await this.teacherService.getOneSubject(+params.subjectId,userId);
    }

    
    @Get("many-subject")
    async getManySubject(
      @GetUser('id') userId: number
    ) {
      return await this.teacherService.getManySubjects(userId);
    }

}
