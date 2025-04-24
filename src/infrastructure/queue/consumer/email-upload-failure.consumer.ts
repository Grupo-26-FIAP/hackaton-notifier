import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { EmailService } from '../../../email/service/email.service';
import * as AWS from 'aws-sdk';

type UploadFailureEvent = {
  to: string;
  name: string;
  videoTitle: string;
  supportUrl: string;
};

@Injectable()
export class EmailUploadFailureConsumer {
  private sqs: AWS.SQS;
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {
    this.sqs = new AWS.SQS();
  }

  @SqsMessageHandler('upload-failure-queue', false) // nome da fila SQS
  async handleMessage(message: AWS.SQS.Message): Promise<void> {
    const data = JSON.parse(message.Body) as UploadFailureEvent;

    console.log(`Received message: ${message.Body}`);

    await this.emailService.sendVideoUploadFailureEmail(data);

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
