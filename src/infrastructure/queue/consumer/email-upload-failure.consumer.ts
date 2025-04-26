import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { EmailService } from '../../../email/service/email.service';
import * as AWS from 'aws-sdk';

type UploadFailureEvent = {
  userId: string;
  fileKey: string;
  error: string;
};

@Injectable()
export class EmailUploadFailureConsumer {
  private sqs: AWS.SQS;
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {
    this.sqs = new AWS.SQS();
  }

  @SqsMessageHandler('failure-message-queue', false) // nome da fila SQS
  async handleMessage(message: AWS.SQS.Message): Promise<void> {
    const data = JSON.parse(message.Body) as UploadFailureEvent;

    console.log(`Received message: ${message.Body}`);

    await this.emailService.sendVideoUploadFailureEmail({
      name: data.userId,
      to: data.userId,
      videoTitle: data.fileKey,
      supportUrl: 'https://support.example.com',
    });

    try {
      await this.sqs
      .deleteMessage({
        QueueUrl: process.env.SQS_QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      })
      .promise()
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.error('Error deleting message from SQS:', error);
    }
  }
}
