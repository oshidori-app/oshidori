import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Keep } from '../models/keep';

import { BaseRepository } from './base.repository';

@Injectable()
export class KeepRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    add(keep: Keep): Promise<any> {
        return super.addDocument(keep);
    }

    update(keep: Keep): Promise<any> {
        return super.updateDocument(keep);
    }

    delete(keep: Keep): void {
        throw new Error('not implemented');
    }

    list(keep: Keep): Observable<Keep[]> {
        return super.listDocument(keep) as Observable<Keep[]>;
    }
}
