import { Injectable, Injector } from '@angular/core';
import { Repository } from "./repository";
import { StoreService } from '../providers/store.service';
import { Observable } from "rxjs";
import { Collection } from '../models/collection';

@Injectable()
export abstract class BaseRepository implements Repository {

    protected store: StoreService;
    constructor(injector: Injector) {
        this.store = injector.get(StoreService);
    }

    public addDocument(model: Collection): Promise<any> {
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

    public updateDocument(model: Collection): Promise<any> {
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

    public listDocument(model: Collection): Observable<{}[]> {
        return this.store.listDocument(model)
    }

 }
