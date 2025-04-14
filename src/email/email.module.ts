import { Module } from '@nestjs/common';
import { EmailController } from './controller/email.controller';
import { EmailService } from './service/email.service';
import { EmailRepository } from './repository/email.repository';

@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
  exports: [EmailService], // Exporta o EmailService para ser utilizado em outros módulos
})
export class EmailModule {}
