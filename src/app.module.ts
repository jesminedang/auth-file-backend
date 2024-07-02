import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, AuthModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
