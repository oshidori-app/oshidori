import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Logger } from '../logger';
import { ImagePicker } from '@ionic-native/image-picker';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { PermissionError } from '../error/permission-error';

@Injectable()
export class ImagePickerService {

    private readonly OPTIONS = {
            quality: 50, // TODO でかいのだけリサイズするように
            maximumImagesCount: 10,
          };

    private readonly MESSAGE = '設定画面でアプリに権限を追加してください。';

    constructor(private imagePicker: ImagePicker, private file: File) {
    }

    async getMultipleFiles(): Promise<File[]> {

        // image pickerで画像を複数取得
        const imagePaths: string[] = await this.imagePicker.getPictures(this.OPTIONS);
        const hasPermission = await this.imagePicker.hasReadPermission();
        if (!hasPermission) {
            throw new PermissionError(this.MESSAGE);
        }
        // 形式を変換
        const fileEntryPromises: Promise<FileEntry>[] = imagePaths.map(filePath => {
            return this.file.resolveLocalFilesystemUrl(filePath);
        }) as Promise<FileEntry>[];
        const fileEntries: FileEntry[] = await Promise.all(fileEntryPromises);
        const CordovaFilePromises: Promise<IFile>[] = fileEntries.map(fileEntry => {
            return this.convertFileEntryToCordovaFile(fileEntry);
        });
        const cordovaFiles: IFile[] = await Promise.all(CordovaFilePromises);
        const filePromises: Promise<File>[] = cordovaFiles.map(cordovaFile => {
            return this.convertCordovaFileToBlob(cordovaFile);
        });

        return Promise.all(filePromises);
    }

    private convertFileEntryToCordovaFile(fileEntry: FileEntry): Promise<IFile> {
        return new Promise<IFile>((resolve, reject) => {
            fileEntry.file(resolve, reject);
        });
    }
    private convertCordovaFileToBlob(cordovaFile: IFile): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.error) {
                    reject(reader.error);
                    Logger.error(reader.error);
                } else {
                    const blob: any = new Blob([reader.result], { type: cordovaFile.type });
                    blob.lastModifiedDate = new Date();
                    blob.name = cordovaFile.name;
                    resolve(blob as File);
                }
            };
            reader.readAsArrayBuffer(cordovaFile);
        });
    }
}
