import { Controller, Post, Delete, Get, Param, UseInterceptors, UploadedFile, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('storage')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('upload/:folder')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    return this.storageService.uploadFile(file, folder);
  }

  @Delete('file')
  async deleteFile(@Body('fileUrl') fileUrl: string) {
    return this.storageService.deleteFile(fileUrl);
  }

  @Get('signed-url/:key')
  async getSignedUrl(@Param('key') key: string) {
    return this.storageService.getSignedUrl(key);
  }
} 