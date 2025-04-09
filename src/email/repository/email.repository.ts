import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailRepository {
  private transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  async sendMail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to,
      subject,
      html,
    });
  }

  compileTemplate(templateName: string, context: any): string {
    const filePath = path.join(
      process.cwd(),
      'src',
      'email',
      'templates',
      `${templateName}.hbs`,
    );

    const source = fs.readFileSync(filePath, 'utf8');
    const compiled = hbs.compile(source);
    return compiled(context);
  }
}
