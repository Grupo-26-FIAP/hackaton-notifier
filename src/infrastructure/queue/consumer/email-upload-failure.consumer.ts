import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { EmailService } from '../../../email/service/email.service';

type UploadFailureEvent = {
  to: string;
  name: string;
  videoTitle: string;
  supportUrl: string;
  year: number;
};

@Injectable()
@SqsMessageHandler('upload-failure-queue', false) // nome da fila SQS
export class EmailUploadFailureConsumer {
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  async handleMessage(message: UploadFailureEvent): Promise<void> {
    await this.emailService.sendVideoUploadFailureEmail(message);
  }
}
