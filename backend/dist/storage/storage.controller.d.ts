import { StorageService } from './storage.service';
export declare class StorageController {
    private storageService;
    constructor(storageService: StorageService);
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
    getSignedUrl(key: string): Promise<string>;
}
