import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class StorageService {

    constructor(private afStorage: AngularFireStorage) { }

    public upload(blob: Blob, fileName: string) {
        const ref = this.afStorage.ref('content/' + fileName);
        const task = ref.put(blob);
        let ret = {
            percentageChanges: task.percentageChanges,
            snapshotChanges: task.snapshotChanges
        }
        return ret;
    }
}