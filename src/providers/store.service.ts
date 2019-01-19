import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from "rxjs";
import { Collection } from "../models/collection";
import { Logger } from "../logger";
import { AuthService } from "./auth.service";

@Injectable()
export class StoreService {

    constructor(private afStore: AngularFirestore, private auth: AuthService) { }

    public addDocument<T extends Collection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            Logger.debug('document');
            Logger.debug(document);
            let data = this.convertPlainObject(document);

            let docRef;
            docRef = this.afStore;

            // 親参照があれば、サブコレクションとして登録
            if(document['parentRef']) {
                docRef = this.afStore.doc(document['parentRef']);
            }
            this.beforeAddConvert(data);
            let collectionName = data['collectionName'];
            Logger.debug(data);
            docRef.collection(collectionName).add(data)
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
    
    // TODO group対応をする。Rootと分ける必要ないかも。
    public listDocument(document: Collection): Observable<{}[]> {
        let collectionName = document['collectionName'];
        let collection = this.afStore.collection(
            collectionName,
            ref => ref
            //  .where('groupId', '==', document['groupId'])
             .orderBy('updated', 'desc')
            );
        // データに変更があったら受け取る
        return collection.valueChanges();
    }

    // TODO 作りかけ。メンテ必要
    public updateDocument<T extends Collection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject(document);
            this.beforeUpdateConvert(document);
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
    private convertPlainObject(document): any {
        // JSON.parse(JSON.stringify(document)) だとfirebaseのオブジェクトが循環参照となるので下記としている。
        return {... document};
    }

    private convertCustomObject<T>(obj): T[] {
        let c: {new(): T};
        return Object.assign(c, obj);
    }

    private beforeAddConvert(data): void {
        data['created'] = firebase.firestore.FieldValue.serverTimestamp();
        data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
        data['createUser'] = this.auth.getUser().uid;
        data['updateUser'] = this.auth.getUser().uid;
    }

    private beforeUpdateConvert(data): void {
        data['updated'] = firebase.firestore.FieldValue.serverTimestamp();
        data['updateUser'] = this.auth.getUser().uid;
    }
}