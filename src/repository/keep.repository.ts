import { Injectable, Injector } from '@angular/core';
import { Keep } from "../models/keep";
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';

@Injectable()
export class KeepRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(keep: Keep): Promise<any> {
        return super.addDocument(keep);
    }

    public update(keep: Keep): Promise<any> {
        return super.updateDocument(keep);
    }

    public delete(keep: Keep): void {
        throw new Error('not implemented');
    }

    public list(keep: Keep): Observable<Keep[]> {
        return super.listDocument(keep) as Observable<Keep[]>;
    }
}