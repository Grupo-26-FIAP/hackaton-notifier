import { Module } from '@nestjs/common';
import { EmailController } from './controller/email.controller';
import { EmailService } from './service/email.service';
import { EmailRepository } from './repository/email.repository';

@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
})
export class EmailModule {}
