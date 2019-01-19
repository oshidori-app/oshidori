import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from "rxjs";
import { Logger } from "../logger";

@Injectable()
export class StorageService {

    private readonly APP_ROOT_PREFIX: string = 'content';

    constructor(private afStorage: AngularFireStorage) {
    }

    public uploadBlob(blob: Blob, fileName: string): {
        fullPath: string,
        ref: any,
        percentageChanges: any,
        snapshotChanges: any
    } {
        let fullPath = this.APP_ROOT_PREFIX + '/' + fileName;
        const ref = this.afStorage.ref(fullPath);
        const task = ref.put(blob);
        let ret = {
            fullPath: 'content/' + fileName,
            ref: ref,
            percentageChanges: task.percentageChanges,
            snapshotChanges: task.snapshotChanges
        }
        Logger.debug("StorageService:uploadBlob:" + fullPath);
        return ret;
    }

    public deleteBlob(fileName: string) {
        let fullPath = this.APP_ROOT_PREFIX + '/' + fileName;
        const ref = this.afStorage.ref(fullPath);
        return ref.delete();
    }

    public uploadFile(file: File, fileName: string): {
        fullPath: string,
        ref: any,
        percentageChanges: any,
        snapshotChanges: any
    } {
        let fullPath = this.APP_ROOT_PREFIX + '/' + fileName;

        const ref = this.afStorage.ref(fullPath);
        const task = this.afStorage.upload(fullPath, file);
        let ret = {
            fullPath: fullPath,
            ref: ref,
            percentageChanges: task.percentageChanges,
            snapshotChanges: task.snapshotChanges
        }
        Logger.debug("StorageService:uploadFile:" + fullPath);
        return ret;
    }

    public getDownloadURL(fullPath: string): Observable<string> {
        if(!fullPath) {
            Logger.debug("file not exist.")
            return;
        }
        const downloadUrl = this.afStorage.ref(fullPath);
        return downloadUrl.getDownloadURL();
    }
}