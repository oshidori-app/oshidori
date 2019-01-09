import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from "rxjs";
import { Entity } from "../models/entity";

@Injectable()
export class StoreService {

    constructor(private afStore: AngularFirestore) { }

    public add<T extends Entity>(model: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject<T>(model);
            data['created'] = firebase.firestore.FieldValue.serverTimestamp();
            data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
            let entityName = model.getEntityName();
            this.afStore.collection(entityName).add(data)
                .then(res => resolve(res))
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    reject(err)
                })
        })
    }

    // TODO キー指定を追加
    public filterByOwnGroup(model: Entity): Observable<{}[]> {

        let entityName = model.getEntityName();
        let collection = this.afStore.collection(
            entityName,
            ref => ref
             .where('groupId', '==', model['groupId'])
             .orderBy('updated', 'desc')
            );
        // データに変更があったら受け取る
        return collection.valueChanges();
    }

    // 現在のfirebaseではcustom objectを引数としてサポートしていないので、
    // plainなオブジェクトに変換する必要あり。
    // https://github.com/firebase/firebase-js-sdk/issues/311
    private convertPlainObject<T>(model: T): object {
        return JSON.parse(JSON.stringify(model));
    }

    private convertCustomObject<T>(obj): T[] {
        let c: {new(): T};
        return Object.assign(c, obj);
    }

}