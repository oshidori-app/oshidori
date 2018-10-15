import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';

@Injectable()
export class StoreService {

    constructor(private afStore: AngularFirestore) { }

    public add<T>(model: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject<T>(model);
            data['created'] = firebase.firestore.FieldValue.serverTimestamp();
            data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
            this.afStore.collection(model['getEntityName'].apply()).add(data)
                .then(res => resolve(res))
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    reject(err)
                })
        })
    }

    // 現在のfirebaseではcustom objectを引数としてサポートしていないので、
    // plainなオブジェクトに変換する必要あり。
    // https://github.com/firebase/firebase-js-sdk/issues/311
    private convertPlainObject<T>(model: T): object {
        return JSON.parse(JSON.stringify(model));
    }

}