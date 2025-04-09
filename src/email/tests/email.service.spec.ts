import { EmailService } from '../service/email.service';
import { EmailRepository } from '../repository/email.repository';

describe('EmailService', () => {
  let emailService: EmailService;
  let emailRepository: EmailRepository;

  beforeEach(() => {
    emailRepository = {
      sendMail: jest.fn(),
      compileTemplate: jest.fn().mockReturnValue('<h1>Test</h1>'),
    } as any;

    emailService = new EmailService(emailRepository);
  });

  it('should send email with compiled template', async () => {
    const dto = {
      to: 'test@example.com',
      subject: 'Welcome!',
      templateData: {
        name: 'João',
        message: 'Seja bem-vindo!',
      },
    };

    await emailService.sendEmail(dto);

    expect(emailRepository.compileTemplate).toHaveBeenCalledWith(
      'welcome',
      dto.templateData,
    );
    expect(emailRepository.sendMail).toHaveBeenCalledWith(
      dto.to,
      dto.subject,
      '<h1>Test</h1>',
    );
  });
});
