import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Test } from '../models/test';

import { BaseRepository } from './base.repository';

@Injectable()
export class TestRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    add(test: Test): Promise<any> {
        return super.addDocument(test);
    }

    update(test: Test): Promise<any> {
        return super.updateDocument(test);
    }

    delete(test: Test): void {
        throw new Error('not implemented');
    }

    list(test: Test): Observable<Test[]> {
        return super.listDocument(test) as Observable<Test[]>;
    }
}
