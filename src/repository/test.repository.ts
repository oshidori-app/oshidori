import { Injectable, Injector } from '@angular/core';
import { Test } from "../models/test";
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { Logger } from '../logger';

@Injectable()
export class TestRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(test: Test): Promise<any> {
        return super.addDocument(test);
    }

    public update(test: Test): Promise<any> {
        return super.updateDocument(test);
    }

    public delete(test: Test): void {
        throw new Error('not implemented');
    }

    public list(test: Test): Observable<Test[]> {
        return super.listDocument(test) as Observable<Test[]>;
    }
}