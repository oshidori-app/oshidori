import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from "rxjs";

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
        return ret;
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
        return ret;
    }

    public getDownloadURL(fullPath: string): Observable<string> {
        const downloadUrl = this.afStorage.ref(fullPath);
        return downloadUrl.getDownloadURL();
    }
}