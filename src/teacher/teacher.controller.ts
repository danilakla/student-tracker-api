import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { SubjectDto } from 'src/subject/dto/subject.dto';
import { JwtGuard } from 'src/auth/guard';
import { StudentReviewDto } from './dto/StudentReview.dto';

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

    
    @Post("create-code-subject")
    async createCodeSubject(
      @GetUser('id') teacherId: number,
      @Query('subjectId') subjectId: number, @Query('liveTime') liveTime: number
    ) {


      return await this.teacherService.generateCodeForSubject(subjectId,liveTime, teacherId);
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
      @GetUser('id') teacherrId: number
    ) {
        
      return await this.teacherService.deleteSubject(+params.subjectId,teacherrId);
    }

    @Get("one-subject/:subjectId")
    async getOneSubject(
        @Param() params: any,
      @GetUser('id') teacherrId: number
    ) {
      return await this.teacherService.getOneSubject(+params.subjectId,teacherrId);
    }

    
    @Get("many-subject")
    async getManySubject(
      @GetUser('id') teacherrId: number
    ) {
      return await this.teacherService.getManySubjects(teacherrId);
    }

      
    @Get("subjects-review")
    async getSubjectForReview(
      @GetUser('id') teacherrId: number
    ) {
      return await this.teacherService.getSubjectWithReviewStudent(teacherrId);
    }

    @Get("students-review/:subjectId")
    async getStudentForReview(
      @GetUser('id') teacherrId: number,
      @Param() params: any,

    ) {
      return await this.teacherService.getReviewStudent(teacherrId, +params.subjectId);
    }

    @Get("student-by-subj/:subjectId")
    async getStudentBySubj(
      @GetUser('id') teacherrId: number,
      @Param() params: any,

    ) {
      return await this.teacherService.getStudentBySubjectIdAttendence(+params.subjectId);
    }

    @Get("amount-student-attend/:subjectId")
    async getAmountStudentAttend(
      @GetUser('id') teacherrId: number,
      @Param() params: any,

    ) {
      return await this.teacherService.getAmountStudentAttend(+params.subjectId);
    }


    @Post("review-acception-student")
    async acceptuinStudent(
      @GetUser('id') teacherId: number,
      @Body() dto: StudentReviewDto,
    ) {
      return await this.teacherService.reviewStudent(dto, teacherId);
    }


}
