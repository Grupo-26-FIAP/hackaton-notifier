import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailUploadFailureConsumer } from './email-upload-failure.consumer';
import { EmailModule } from '../../../email/email.module';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});


console.log(process.env.SQS_QUEUE_URL);
console.log(process.env.AWS_REGION);

@Module({
  imports: [ConfigModule, EmailModule, 
    SqsModule.register({
    consumers: [
      {
        name: 'upload-failure-queue',
        queueUrl: process.env.SQS_QUEUE_URL,
        region: process.env.AWS_REGION,
      },
    ],
  }),
  ],
  providers: [EmailUploadFailureConsumer],
})
export class QueueModule {}
