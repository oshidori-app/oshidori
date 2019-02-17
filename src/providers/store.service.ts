import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Collection } from '../models/collection';
import { Logger } from '../logger';
import { AuthService } from './auth.service';

@Injectable()
export class StoreService {

    constructor(private afStore: AngularFirestore, private auth: AuthService) { }

    /**
     * IDは自動採番でドキュメントを追加する
     *
     * @template T
     * @param {T} document
     * @returns {Promise<any>}
     * @memberof StoreService
     */
    public addDocument<T extends Collection>(document: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            let data = this.convertPlainObject(document);

            let docRef: any = this.afStore;
            // 親参照があれば、サブコレクションとして登録
            if (data['parentRef']) {
                docRef = this.afStore.doc(data['parentRef']);
            }
            this.beforeAddConvert(data);
            let collectionName = data['collectionName'];
            docRef.collection(collectionName).add(data)
                .then(ref => {
                    Logger.debug('new Document ref:' + ref.path);
                    ref.update({ ref })
                        .then(updatedRef => {
                            Logger.debug('refence updated!!');
                            resolve(ref);
                        })
                        .catch(err => {
                            Logger.error(err);
                            reject(err);
                        });
                })
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    Logger.error(err);
                    reject(err);
                });
        });
    }

    /**
     * IDを指定してドキュメントを作成する
     *
     * @template T
     * @param {T} document
     * @param {string} docId 任意のID文字列。GUIDにすること。
     * @returns {Promise<any>}
     * @memberof StoreService
     */
    public setDocument<T extends Collection>(document: T, docId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data = this.convertPlainObject(document);

            let docRef: any = this.afStore;
            // 親参照があれば、サブコレクションとして登録
            if (data['parentRef']) {
                docRef = this.afStore.doc(data['parentRef']);
            }
            this.beforeAddConvert(data);
            let collectionName = data['collectionName'];
            let _ref = docRef.collection(collectionName).doc(docId);
            _ref.set(data)
                .then(() => {
                    Logger.debug('new Document ref');
                    Logger.debug(_ref.ref);
                    _ref.update({ ref: _ref.ref })
                        .then(updatedRef => {
                            Logger.debug('refence updated!!');
                            resolve(_ref.ref);
                        })
                        .catch(err => {
                            Logger.error(err);
                            reject(err);
                        });
                })
                .catch(err => {
                    // TOOD: firebaseに依存しない業務例外を返却する
                    Logger.error(err);
                    reject(err);
                });
        });
    }

    // TODO group対応をする。Rootと分ける必要ないかも。
    public listDocument(document: Collection): Observable<{}[]> {
        let collectionName = document['collectionName'];

        let docRef: any = this.afStore;
        // 親参照があれば、サブコレクションとして登録
        if (document['parentRef']) {
            docRef = this.afStore.doc(document['parentRef']);
        }
        let collection = docRef.collection(
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
                    reject(err);
                });
        });
    }

    /**
     * ドキュメントへの参照を引数で受け取り、1件のドキュメントを返却する。
     *
     * @param {*} docRef
     * @returns
     * @memberof StoreService
     */
    public findDocument(docRef: any) {
        return this.afStore.doc(docRef).valueChanges();
    }

    // 現在のfirebaseではcustom objectを引数としてサポートしていないので、
    // plainなオブジェクトに変換する必要あり。
    // https://github.com/firebase/firebase-js-sdk/issues/311
    private convertPlainObject(document): any {
        // JSON.parse(JSON.stringify(document)) だとfirebaseのオブジェクトが循環参照となるので下記としている。
        return { ...document };
    }

    private convertCustomObject<T>(obj): T[] {
        let c: new() => T;
        return { ...c, ...obj };
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
