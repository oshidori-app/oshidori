import { Injectable, Injector } from '@angular/core';
import { Repository } from "./repository";
import { StoreService } from '../providers/store.service';
import { Observable } from "rxjs";
import { Entity } from '../models/entity';

@Injectable()
export abstract class BaseRepository<T extends Entity> implements Repository<T> {

    protected store: StoreService;
    constructor(injector: Injector) { 
        this.store = injector.get(StoreService);
    }

    add(model: Entity): Promise<any> {
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

    update(model: Entity): void {
        throw new Error('not implemented');
    }

    delete(model: Entity): void {
        throw new Error('not implemented');
    }

    filterByOwnGroup(model: Entity): Observable<{}[]> {
        return this.store.filterByOwnGroup(model)
    }
 }