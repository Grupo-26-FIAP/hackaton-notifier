import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from '../service/email.service';
import { EmailUploadFailureDto } from '../dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('upload-failure')
  sendUploadFailure(@Body() body: EmailUploadFailureDto) {
    return this.emailService.sendVideoUploadFailureEmail(body);
  }

  @Get('/')
  async get(): Promise<string> {
    return 'it works!';
  }
}
