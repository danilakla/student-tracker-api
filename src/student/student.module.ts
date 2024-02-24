import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CryptoModule } from 'src/crypto/crypto.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports:[CryptoModule],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
