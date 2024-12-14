import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuizeService } from './quize.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { QuizeForm } from './dto/QuizeForm.dto';

@Controller('quize')
@UseGuards(JwtGuard)

export class QuizeController {

    constructor(private quizeService:QuizeService){

    }

        
    @Post("create-quize")
    async setFlag(
      @GetUser('id') teacherId: number,
      @Body() body: QuizeForm,

    ) {

      return await this.quizeService.saveQuizeForm(body,teacherId);
    }

            
    @Get("get-quize/:name")
    async getQuize(
        @Param() params: any,
    ) {

      return await this.quizeService.getQuizeForm(params.name);
    }


}
