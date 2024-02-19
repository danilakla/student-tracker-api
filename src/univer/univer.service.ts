import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UniverService {
  constructor(private prisma: PrismaService) {}
  async isExist(univerName: string): Promise<Boolean> {
    try {
      const univer = await this.prisma.university.findFirst({
        where: { name: univerName },
      });

      if (univer == null) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async addUniversity(univerName: string, id: number) {
    if (await this.isExist(univerName)) throw new BadRequestException();
    try {
      const createdUniversity = await this.prisma.university.create({
        data: {
          name: univerName,
          user: { connect: { id } },
        },
      });
      return createdUniversity;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getUniverByUserId(userId:number){
    try {

        const univerdata = await this.prisma.user.findFirst({
            where: { id:userId },
            select: {
              university: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          });
          return univerdata;
    } catch (error) {
        throw error;
    }

  }
  async deleteUniversity( userId: number) {
    try {
    const univerdata =await  this.getUniverByUserId(userId);

    if (!(await this.isExist(univerdata.university.name))) throw new BadRequestException();
   
     const data= await this.prisma.university.delete({where:{id:univerdata.university.id}})
      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }


  async updateUniversityName(updatedUniverName: string, id: number) {
    try {

        const univerdata =await  this.getUniverByUserId(id);


    if (!(await this.isExist(univerdata.university.name)))
      throw new BadRequestException();
      const createdUniversity = await this.prisma.university.update({
        where: { id: univerdata.university.id },
        data: {
          name: updatedUniverName,
        },
      });
      return createdUniversity;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
