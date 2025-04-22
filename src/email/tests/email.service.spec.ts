import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../service/email.service';
import { EmailRepository } from '../repository/email.repository';

describe('EmailService', () => {
  let service: EmailService;
  let repository: EmailRepository;

  const mockEmailRepository = {
    sendMailWithTemplate: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: EmailRepository,
          useValue: mockEmailRepository,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    repository = module.get<EmailRepository>(EmailRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send video upload failure email with correct data', async () => {
    const to = 'user@example.com';
    const name = 'João';
    const videoTitle = 'Demo Video';
    const supportUrl = 'https://support.example.com';

    const expectedTemplate = 'video-upload-failure';
    const expectedSubject = 'Falha no upload do seu vídeo';

    const expectedContext = { to, name, videoTitle, supportUrl };

    const emailUploadFailureDto = { to, name, videoTitle, supportUrl };
    await service.sendVideoUploadFailureEmail(emailUploadFailureDto);

    expect(repository.sendMailWithTemplate).toHaveBeenCalledWith(
      to,
      expectedSubject,
      expectedTemplate,
      expectedContext,
    );
  });
});
