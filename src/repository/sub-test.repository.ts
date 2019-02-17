import { Injectable, Injector } from '@angular/core';
import { SubTest } from '../models/sub-test';
import { BaseRepository } from './base.repository';
import { Observable } from 'rxjs';

@Injectable()
export class SubTestRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(test: SubTest): Promise<any> {
        return super.addDocument(test);
    }

    public update(test: SubTest): Promise<any> {
        return super.updateDocument(test);
    }

    public delete(test: SubTest): void {
        throw new Error('not implemented');
    }

    public list(test: SubTest): Observable<SubTest[]> {
        return super.listDocument(test) as Observable<SubTest[]>;
    }
}
