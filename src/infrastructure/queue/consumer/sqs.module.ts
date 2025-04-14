import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailUploadFailureConsumer } from './email-upload-failure.consumer';
import { EmailModule } from '../../../email/email.module';

@Module({
  imports: [
    ConfigModule,
    EmailModule,
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        consumers: [
          {
            name: 'upload-failure-queue',
            queueUrl: configService.get<string>('SQS_QUEUE_URL'),
            region: configService.get<string>('AWS_REGION'),
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailUploadFailureConsumer],
})
export class QueueModule {}
