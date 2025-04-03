import { StorageService } from './storage.service';
export declare class StorageController {
    private storageService;
    constructor(storageService: StorageService);
    uploadFile(file: Express.Multer.File, folder: string): unknown;
    deleteFile(fileUrl: string): unknown;
    getSignedUrl(key: string): unknown;
}
