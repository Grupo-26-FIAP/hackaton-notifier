import { Injectable } from '@nestjs/common';
import { EmailRepository } from '../repository/email.repository';
import { EmailUploadFailureDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendVideoUploadFailureEmail(dto: EmailUploadFailureDto) {
    const context = {
      to: dto.to,
      name: dto.name,
      videoTitle: dto.videoTitle,
      supportUrl: dto.supportUrl,
    };

    console.log('Sending email with context:', context);


    return this.emailRepository.sendMailWithTemplate(
      dto.to,
      'Falha no upload do seu vídeo',
      'video-upload-failure',
      context,
    );
  }
}
