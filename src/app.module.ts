import { Module } from '@nestjs/common';
import { EmailService } from './email/service/email.service';
import { EmailRepository } from './email/repository/email.repository';
import { EmailController } from './email/controller/email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
})
export class AppModule {}
