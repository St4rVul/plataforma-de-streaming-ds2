import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    private storage;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
    getSignedUrl(fileName: string, expiresIn?: number): Promise<string>;
}
