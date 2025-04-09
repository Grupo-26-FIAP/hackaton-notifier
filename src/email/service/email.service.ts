import { Injectable } from '@nestjs/common';
import { EmailRepository } from '../repository/email.repository';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendEmail(data: SendEmailDto) {
    const html = this.emailRepository.compileTemplate(
      'welcome',
      data.templateData,
    );
    await this.emailRepository.sendMail(data.to, data.subject, html);
  }
}
