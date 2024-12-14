import { SubjectDto } from './dto/subject.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async getSubjects(teacherId) {
    try {
        const subjects = this.prisma.subject.findMany({where:{teacherId:teacherId}})  
        return subjects;
    } catch (error) {
      throw error;
    }
  }
  async addSuject(subjectDto: SubjectDto, id: number) {
    try {
      const subject = await this.prisma.subject.create({
        data: {
          subject_name: subjectDto.subjectName,
          term: subjectDto.term,
          numberOfStudent: subjectDto.numberOfStudent,
          numberPassLecture: subjectDto.numberPassLecture,
          course: subjectDto.course,
          teacher: { connect: { id } },
        },
      });
      return subject;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getSubjectByTeacherSubjectId(subjectid:number, teacherId: number) {
    try {
      const subjects = await this.prisma.subject.findFirst({
        where: { id:+subjectid, teacherId:teacherId  },
      
      });
      return subjects;
    } catch (error) {
      throw error;
    }
  }
  async deleteSubject(subjectId: number, userId: number) {
    try {
      const data = await this.prisma.subject.delete({
        where: { id: subjectId, teacherId: userId },
      });
      return data;
    } catch (error) {

      throw new BadRequestException();
    }
  }

  async addCountLesson(subjectId: number, teacherId: number) {
    try {
      const updatedSubj = await this.prisma.subject.update({
        where: { id: subjectId, teacherId: teacherId },
        data: {
          numberPassLecture: {
            increment: 1,
          },
        },
      });
      return updatedSubj;
    } catch (error) {
      throw error;
    }
  }

  async updateSubject(
    subjectDto: SubjectDto,

    teacherId: number,
  ) {
    try {
      const updateSubject = await this.prisma.subject.update({
        where: { id: subjectDto.subjectId, teacherId: teacherId },
        data: {
          subject_name: subjectDto.subjectName,
          term: subjectDto.term,
          numberOfStudent: subjectDto.numberOfStudent,
          numberPassLecture: subjectDto.numberPassLecture,
          course: subjectDto.course,
        },
      });
      return updateSubject;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
