import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private storage: admin.storage.Storage;

  constructor(private configService: ConfigService) {
    // Inicializar Firebase Admin si no está inicializado
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
        }),
        storageBucket: this.configService.get('FIREBASE_STORAGE_BUCKET'),
      });
    }
    this.storage = admin.storage();
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
    const bucket = this.storage.bucket();

    try {
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      return new Promise((resolve, reject) => {
        stream.on('error', (error) => reject(error));
        stream.on('finish', async () => {
          // Hacer el archivo público
          await fileUpload.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(publicUrl);
        });
        stream.end(file.buffer);
      });
    } catch (error) {
      throw new BadRequestException('Error al subir el archivo a Firebase Storage');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const bucket = this.storage.bucket();
    const fileName = fileUrl.split('.com/')[1];
    
    try {
      await bucket.file(fileName).delete();
    } catch (error) {
      throw new BadRequestException('Error al eliminar el archivo de Firebase Storage');
    }
  }

  async getSignedUrl(fileName: string, expiresIn: number = 3600): Promise<string> {
    const bucket = this.storage.bucket();
    
    try {
      const [url] = await bucket.file(fileName).getSignedUrl({
        action: 'read',
        expires: Date.now() + expiresIn * 1000,
      });
      return url;
    } catch (error) {
      throw new BadRequestException('Error al generar URL firmada');
    }
  }
} 