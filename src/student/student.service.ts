import { UserAttendDto } from './dto/attendedUser.dto';
import { PrismaClient } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { SubjectService } from 'src/subject/subject.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {

    constructor(private prisma: PrismaService, private cryptoService: CryptoService ){

    }
    async decodeCodeForSubject(code:string){

        const dataStr= (await this.cryptoService.decryptString(code)).split("$");
        
        return dataStr;
   }
   async hasScanRecently(subjectId:number, studentId:number, timeNow:Date){
    try {
        
    const data= await this.prisma.studentSubject.findUnique({where:{
       studentId_subjectId:{
        studentId:+studentId,
        subjectId:+subjectId
       }
    }}).catch();
    if(data==null)
    {   
        await this.prisma.studentSubject.create({data:{
            studentId:studentId,
            subjectId:+subjectId,
            attendanceCount: 0,
            reviewStatus: false,
            lastTimeScan:new Date('0000-01-01').toString()
        }})
        return false
    }
    const lastTimdeScan= new Date(data.lastTimeScan);
    const currentTime = new Date(timeNow);
    const time= currentTime.getTime() - lastTimdeScan.getTime();
    if(time<3600000){
        return true;
    }else{
        return false;
    }

} catch (error) {
 return false;       
}
   }
   async valiedUserAtten(studentPayloadForAttend:UserAttendDto, studentId:number){
    const [subjectId, time, liveTime] = await this.decodeCodeForSubject(studentPayloadForAttend.code);
    const pastTime= new Date(time);
    const nowTime= new Date(studentPayloadForAttend.time);
    if((await this.hasScanRecently(+subjectId, studentId, nowTime))){
        return {
            code:"you scan already"
        }
    }
    if (this.isValidTimeForStudent(pastTime, nowTime, +liveTime))    {
      const data=  await this.prisma.studentSubject.upsert({
            where: {
             studentId_subjectId:{
                studentId:studentId,
                subjectId:+subjectId
             }
            },
            create: {
                studentId:studentId,
                subjectId:+subjectId,
                attendanceCount: 1,
                reviewStatus: false,
                lastTimeScan:nowTime.toString()
            },
            update: {
                studentId:studentId,
                subjectId:+subjectId,
                attendanceCount: {
                    increment:1
                },
                reviewStatus: false,
                lastTimeScan:nowTime.toString()
            }
        });
        return {data, code:"success"};
    }else{
        return {
            subjectId,
            code:"not inf time",
            status:400
        }
    }
   }

   async setFlagForStudent( studentId:number, subjectId: number){
    const data=  await this.prisma.studentSubject.update({
        where: {
         studentId_subjectId:{
            studentId:studentId,
            subjectId:+subjectId
         }
        },
        data: {
            reviewStatus: true,
        }
    });
    return data;
   }
    isValidTimeForStudent(pastTime:Date, nowTime:Date, liveTime:number){
            
        const acctualyTime = nowTime.getTime()- pastTime.getTime();
        const liveTimeInMillisecond: number = liveTime * 1000;
            if(acctualyTime>liveTimeInMillisecond){
                return false;
            }else{
                return true;
            }

   }

}
