import { Module } from '@nestjs/common';
import { UniverService } from './univer.service';

@Module({
  providers: [UniverService],
  exports:[UniverService]
})
export class UniverModule {}
