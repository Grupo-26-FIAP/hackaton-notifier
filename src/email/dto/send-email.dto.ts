export class SendEmailDto {
  to: string;
  subject: string;
  templateData: {
    name: string;
    message: string;
  };
}
