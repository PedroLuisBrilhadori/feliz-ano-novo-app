import { Module } from '@nestjs/common';
import { MuralController } from './mural.controller';
import { MuralService } from './mural.service';

@Module({
  controllers: [MuralController],
  providers: [MuralService],
})
export class MuralModule {}
