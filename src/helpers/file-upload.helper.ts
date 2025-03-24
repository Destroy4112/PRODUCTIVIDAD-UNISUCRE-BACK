import { Request } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

export const fileUploadOptions = (destinationFolder: string) => {

    const uploadPath = path.join(__dirname, '../../', destinationFolder);

    return {
        storage: diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb) => {
                fs.mkdir(uploadPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error('Error creando el directorio:', err);
                        return cb(err, null);
                    }
                    cb(null, uploadPath);
                });
            },
            filename: (req: Request, file: Express.Multer.File, cb) => {
                const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
                cb(null, filename);
            },
        }),
        fileFilter: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, true);
        },
    };
};
