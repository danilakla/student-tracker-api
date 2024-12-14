import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
@Injectable()
export class CryptoService {
    private iv=null;
    constructor(

        private config: ConfigService){
        this.iv = randomBytes(16);
            
        }
     public async encryptString (value: string): Promise<string>{
        
            
        const key = (await promisify(scrypt)( this.config.get('sec_key'), 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, this.iv);
   
        let encryptedText = cipher.update(value, 'utf8', 'hex');
        encryptedText += cipher.final('hex');

        return encryptedText;
      };
      
      public async decryptString   (encryptedValue: string): Promise<string> {
        const key = (await promisify(scrypt)( this.config.get('sec_key'), 'salt', 32)) as Buffer;

        const decipher = createDecipheriv('aes-256-ctr',key, this.iv);
        let decryptedText = decipher.update(encryptedValue, 'hex', 'utf8');
        decryptedText += decipher.final('utf8');

        return decryptedText;
      };
}
