import { Injectable, Injector } from '@angular/core';
import { Repository } from "./repository";
import { StoreService } from '../providers/store.service';
import { Observable } from "rxjs";
import { Collection } from '../models/Collection';
import { SubCollection } from '../models/sub-collection';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Injectable()
export abstract class BaseRepository implements Repository {

    protected store: StoreService;
    constructor(injector: Injector) { 
        this.store = injector.get(StoreService);
    }

    public addToRootCollection(model: Collection): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.addToRootCollection(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    public addToSubCollection(model: SubCollection): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.addToSubCollection(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    

    public updateRootCollection(model: Collection): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.updateRootCollection(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    // delete(model: T): void {
    //     throw new Error('not implemented');
    // }

    public listByRootCollection(model: Collection): Observable<{}[]> {
        return this.store.listByRootCollection(model)
    }

    // TODO 返却の型を頑張りたい...
    public listBySubCollection(model: SubCollection): any {
        return this.store.listBySubCollection(model)
    }

 }