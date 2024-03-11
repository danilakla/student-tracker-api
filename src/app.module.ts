import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';
import { AdminModule } from './admin/admin.module';
import { UniverModule } from './univer/univer.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { QuizeModule } from './quize/quize.module';
import { CounterGateway } from './counter/counter.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, AuthModule,  AdminModule, SubjectModule, TeacherModule, StudentModule, QuizeModule],
  providers: [CounterGateway],

})
export class AppModule {}
