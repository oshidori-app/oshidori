import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Collection } from '../models/collection';
import { StoreService } from '../providers/store.service';

@Injectable()
export abstract class BaseRepository {

    protected store: StoreService;
    constructor(injector: Injector) {
        this.store = injector.get(StoreService);
    }

    protected addDocument(model: Collection): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.addDocument(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    protected setDocument(model: Collection, docId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.setDocument(model, docId)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    protected updateDocument(model: Collection): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.updateDocument(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    protected listDocument(model: Collection): Observable<{}[]> {
        return this.store.listDocument(model);
    }

    protected findDocument(docRef: any): Observable<{}> {
        return this.store.findDocument(docRef);
    }
}
