import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule } from '@nestjs/config';
import { EmailUploadFailureConsumer } from './email-upload-failure.consumer';
import { EmailModule } from '../../../email/email.module';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

@Module({
  imports: [
    ConfigModule,
    EmailModule,
    SqsModule.register({
      consumers: [
        {
          name: 'failure-message-queue',
          queueUrl: process.env.SQS_QUEUE_URL,
          region: process.env.AWS_REGION,
        },
      ],
    }),
  ],
  providers: [EmailUploadFailureConsumer],
})
export class QueueModule {}
