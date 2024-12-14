import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { UniverService } from 'src/univer/univer.service';

@Injectable()
export class AdminService {

    constructor(private cryptoService:CryptoService,
        private univerService: UniverService){}
    

   async  encryptTeacherToken(id:number):Promise<string> {
    
    
    const univerName =await  this.univerService.getUniverByUserId(id);
    return await this.cryptoService.encryptString(id+"$"+univerName.university.name) ;
   }



   async createUniversity(univerName: string, id: number){
    try {
       return await this.univerService.addUniversity(univerName, id);
        
    } catch (error) {
    throw error;        
    }    
   }

   async updateUniversity(updatedUniverName: string, id: number){
    try {
       return await this.univerService.updateUniversityName(updatedUniverName, id);
        
    } catch (error) {
    throw error;        
    }    
   }

   async deleteUniversity(id: number){
    try {
       return await this.univerService.deleteUniversity( id);
        
    } catch (error) {
    throw error;        
    }    
   }
}
