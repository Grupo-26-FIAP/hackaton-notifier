import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../service/email.service';
import { SendEmailDto } from '../dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() body: SendEmailDto) {
    await this.emailService.sendEmail(body);
    return { message: 'Email enviado com sucesso!' };
  }
}
