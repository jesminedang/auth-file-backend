import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async saveFileData(file: Express.Multer.File, userId: number) {
    return this.prisma.file.create({
      data: {
        filename: file.filename,
        path: file.path,
        userId,
      },
    });
  }
}
