import { Injectable, Injector } from '@angular/core';
import { Repository } from "./repository";
import { StoreService } from '../providers/store.service';

@Injectable()
export abstract class BaseRepository<T> implements Repository<T> {

    protected store: StoreService;
    constructor(injector: Injector) { 
        this.store = injector.get(StoreService);
    }

    add(model: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.store.add(model)
                .then(docRef => {
                    resolve(docRef);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    update(user: T): void {
        throw new Error('not implemented');
    }

    delete(user: T): void {
        throw new Error('not implemented');
    }
}