import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { SubTest } from '../models/sub-test';

import { BaseRepository } from './base.repository';

@Injectable()
export class SubTestRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    add(test: SubTest): Promise<any> {
        return super.addDocument(test);
    }

    update(test: SubTest): Promise<any> {
        return super.updateDocument(test);
    }

    delete(test: SubTest): void {
        throw new Error('not implemented');
    }

    list(test: SubTest): Observable<SubTest[]> {
        return super.listDocument(test) as Observable<SubTest[]>;
    }
}
