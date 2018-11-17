import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class StorageService {

    constructor(private afStorage: AngularFireStorage) { }

    public uploadBlob(blob: Blob, fileName: string) {

        const ref = this.afStorage.ref('content/' + fileName);
        const task = ref.put(blob);
        let ret = {
            ref: ref,
            percentageChanges: task.percentageChanges,
            snapshotChanges: task.snapshotChanges
        }
        return ret;
    }

    public uploadFile(file: File, fileName: string) {
        const ref = this.afStorage.ref('content/' + fileName);
        const task = this.afStorage.upload('content/' + fileName, file);
        let ret = {
            ref: ref,
            percentageChanges: task.percentageChanges,
            snapshotChanges: task.snapshotChanges
        }
        return ret;
    }

}