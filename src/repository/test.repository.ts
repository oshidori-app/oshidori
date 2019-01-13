import { Injectable, Injector } from '@angular/core';
import { Test } from "../models/test";
import { BaseRepository } from './base.repository';
import { Observable } from 'rxjs';

@Injectable()
export class TestRepository extends BaseRepository<Test> {

    constructor(injector: Injector) {
        super(injector);
     }

    add(test: Test): Promise<any> {
        return super.add(test);
    }

    update(test: Test): void {
        throw new Error('not implemented');
    }

    delete(test: Test): void {
        throw new Error('not implemented');
    }

    getList(test: Test): Observable<Test[]> {
        return super.filterByOwnGroup(test) as Observable<Test[]>;
    }
}