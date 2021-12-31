import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitFirebase } from './firebase.config';
import { createMailer } from './mailer.config';
import * as dotenv from 'dotenv';

dotenv.config();

export const mailer = createMailer();
InitFirebase();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
