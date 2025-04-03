"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
const uuid_1 = require("uuid");
let StorageService = class StorageService {
    constructor(configService) {
        var _a;
        this.configService = configService;
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: this.configService.get('FIREBASE_PROJECT_ID'),
                    clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
                    privateKey: (_a = this.configService.get('FIREBASE_PRIVATE_KEY')) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
                }),
                storageBucket: this.configService.get('FIREBASE_STORAGE_BUCKET'),
            });
        }
        this.storage = admin.storage();
    }
    async uploadFile(file, folder) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${folder}/${(0, uuid_1.v4)()}.${fileExtension}`;
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
                    await fileUpload.makePublic();
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                    resolve(publicUrl);
                });
                stream.end(file.buffer);
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al subir el archivo a Firebase Storage');
        }
    }
    async deleteFile(fileUrl) {
        const bucket = this.storage.bucket();
        const fileName = fileUrl.split('.com/')[1];
        try {
            await bucket.file(fileName).delete();
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al eliminar el archivo de Firebase Storage');
        }
    }
    async getSignedUrl(fileName, expiresIn = 3600) {
        const bucket = this.storage.bucket();
        try {
            const [url] = await bucket.file(fileName).getSignedUrl({
                action: 'read',
                expires: Date.now() + expiresIn * 1000,
            });
            return url;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al generar URL firmada');
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map