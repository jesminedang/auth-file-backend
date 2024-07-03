import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../src/files/files.service';
import { PrismaService } from 'src/prisma.service';

describe('FilesService', () => {
  let filesService: FilesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: PrismaService,
          useValue: {
            file: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('saveFileData', () => {
    it('should save file data and return the created file', async () => {
      const file = { filename: 'test-file.pdf', path: '/uploads/test-file.pdf' } as Express.Multer.File;
      const userId = 1;
      const savedFile = { id: 1, filename: 'test-file.pdf', path: '/uploads/test-file.pdf', userId };

      jest.spyOn(prismaService.file, 'create').mockResolvedValue(savedFile);

      const result = await filesService.saveFileData(file, userId);
      expect(result).toEqual(savedFile);
    });
  });

});
