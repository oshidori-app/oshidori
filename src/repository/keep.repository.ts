import { Injectable, Injector } from '@angular/core';
import { Keep } from "../models/keep";
import { BaseRepository } from './base.repository';

@Injectable()
export class KeepRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(keep: Keep): Promise<any> {
        return super.addDocument(keep);
    }

    update(user: Keep): void {
        throw new Error('not implemented');
    }

    delete(user: Keep): void {
        throw new Error('not implemented');
    }
}