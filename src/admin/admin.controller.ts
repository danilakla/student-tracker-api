import { AdminService } from './admin.service';
import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateUniverDto } from 'src/univer/dto/create-univer.dto';
import { UpdateUniverDto } from 'src/univer/dto/update-univer.dto';
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {


    constructor(private adminService:AdminService){}

    @Post("create-univer")
    async createUniver(
      @GetUser('id') userId: number,
      @Body() dto: CreateUniverDto,
    ) {

      return await this.adminService.createUniversity(dto.univerName, userId);
    }

    
    @Put("update-univer")
    async updateUniver(
      @GetUser('id') userId: number,
      @Body() dto: UpdateUniverDto,
    ) {
      return await this.adminService.updateUniversity(dto.updatedUniverName, userId);
    }


      
    @Delete("delete-univer")
    async deleteUniver(
      @GetUser('id') userId: number
    ) {
      return await this.adminService.deleteUniversity( userId);
    }

    @Post("create-teacher-token")
    async createTeacherToken(
        @GetUser('id') userId: number
        ){
        return await this.adminService.encryptTeacherToken(userId);
    }
}
