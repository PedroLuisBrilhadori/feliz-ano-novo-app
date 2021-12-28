import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuralModule } from './mural/mural.module';

@Module({
  imports: [MuralModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
