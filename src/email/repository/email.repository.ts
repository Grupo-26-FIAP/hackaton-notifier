import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailRepository {
  private transporter = createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  async sendMailWithTemplate(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ) {
    const html = this.compileTemplate(templateName, context);
    await this.transporter.sendMail({
      from: '"Hackaton Notifier" <no-reply@hackaton.com>',
      to,
      subject,
      html,
    });
  }

  private compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): string {
    const templatePath = this.resolveTemplatePath(`${templateName}.hbs`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    return template(context);
  }

  private resolveTemplatePath(templateFile: string): string {
    const basePath =
      process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '..', 'templates') // dist/email/templates
        : path.join(__dirname, '..', 'templates'); // src/email/templates

    return path.join(basePath, templateFile);
  }
}
