import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule], // Import AuthModule here
  providers: [FilesService, PrismaService],
  controllers: [FilesController],
})
export class FilesModule {}
