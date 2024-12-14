import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { SubjectModule } from 'src/subject/subject.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports:[SubjectModule, CryptoModule],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
