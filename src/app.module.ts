import { Module } from '@nestjs/common';
import { EmailService } from './email/service/email.service';
import { EmailRepository } from './email/repository/email.repository';
import { EmailController } from './email/controller/email.controller';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './infrastructure/queue/consumer/sqs.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), QueueModule],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
})
export class AppModule {}
