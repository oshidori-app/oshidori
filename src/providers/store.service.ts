import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from "rxjs";
import { Collection } from "../models/collection";
import { SubCollection } from "../models/sub-collection";
import { Logger } from "../logger";

@Injectable()
export class StoreService {

    constructor(private afStore: AngularFirestore) { }

    public addToRootCollection<T extends Collection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject<T>(document);
            data['created'] = firebase.firestore.FieldValue.serverTimestamp();
            data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
            let collectionName = document.getCollectionName();
            this.afStore.collection(collectionName).add(data)
                .then(ref => {
                    Logger.debug(ref.id);
                    this.afStore.collection(collectionName).doc(ref.id).update({
                        ref: ref
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    reject(err)
                })
        })
    }
    public addToSubCollection<T extends SubCollection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject<T>(document);
            data['created'] = firebase.firestore.FieldValue.serverTimestamp();
            data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
            let collectionName = document.getCollectionName();
            let ref = document.getParentRef();
            let parentDoc = this.afStore.doc(ref);
            parentDoc.collection(collectionName).add(data)
                .then(res => resolve(res))
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    reject(err)
                })
        })
    }

    // TODO キー指定を追加
    public listByRootCollection(document: Collection): Observable<DocumentChangeAction<{}>[]> {
        let collectionName = document.getCollectionName();
        let collection = this.afStore.collection(
            collectionName,
            ref => ref
             .where('groupId', '==', document['groupId'])
             .orderBy('updated', 'desc')
            );
        // データに変更があったら受け取る
        return collection.snapshotChanges();
    }

    public listBySubCollection(document: SubCollection): Observable<{}[]> {

        throw new Error('not implemented');

        // let collectionName = document.getCollectionName();
        // let collection = this.afStore.collection(
        //     collectionName,
        //     ref => ref
        //      .where('groupId', '==', document['groupId'])
        //      .orderBy('updated', 'desc')
        //     );
        // // データに変更があったら受け取る
        // return collection.valueChanges();
    }

    public updateRootCollection<T extends Collection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = {... document};
            data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
            let collectionName = data['collectionName'];
            Logger.debug(data);
            this.afStore.collection(collectionName).doc((data['ref'])['id']).update(data)
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
    private convertPlainObject<T>(document: T): object {
        return JSON.parse(JSON.stringify(document));
    }

    private convertCustomObject<T>(obj): T[] {
        let c: {new(): T};
        return Object.assign(c, obj);
    }

}