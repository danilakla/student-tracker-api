import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserAttendDto } from './dto/attendedUser.dto';
@UseGuards(JwtGuard)

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){

    }


    @Post("validate-attendence")
    async validateAttendence(
      @GetUser('id') studentId: number,
      @Body() dto: UserAttendDto,
    ) {

      return await this.studentService.valiedUserAtten(dto, studentId);
    }


    
    @Post("set-attendence-flag/:subjectId")
    async setFlag(
      @GetUser('id') studentId: number,
      @Param() params: any,

    ) {

      return await this.studentService.setFlagForStudent(studentId, +params.subjectId);
    }

}
