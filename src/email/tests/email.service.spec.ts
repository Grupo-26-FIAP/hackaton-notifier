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
    const dto = {
      to: 'user@example.com',
      name: 'João',
      videoTitle: 'Demo Video',
      supportUrl: 'https://support.example.com',
      year: 2025,
    };

    const expectedSubject = 'Falha no upload do seu vídeo';
    const expectedTemplate = 'video-upload-failure';
    const expectedContext = {
      name: dto.name,
      videoTitle: dto.videoTitle,
      supportUrl: dto.supportUrl,
      year: dto.year,
    };

    await service.sendVideoUploadFailureEmail(dto);

    expect(repository.sendMailWithTemplate).toHaveBeenCalledWith(
      dto.to,
      expectedSubject,
      expectedTemplate,
      expectedContext,
    );
  });
});
