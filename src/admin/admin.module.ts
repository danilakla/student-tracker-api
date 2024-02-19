import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { UniverModule } from 'src/univer/univer.module';

@Module({
  imports:[CryptoModule, UniverModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
