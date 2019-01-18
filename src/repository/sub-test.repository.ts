import { Injectable, Injector } from '@angular/core';
import { SubTest } from "../models/sub-test";
import { BaseRepository } from './base.repository';
import { Observable } from 'rxjs';

@Injectable()
export class SubTestRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(test: SubTest): Promise<any> {
        return super.addToSubCollection(test);
    }

    public update(test: SubTest): Promise<any> {
        return super.updateRootCollection(test);
    }

    public delete(test: SubTest): void {
        throw new Error('not implemented');
    }

    public list(test: SubTest): Observable<SubTest[]> {
        return super.listBySubCollection(test) as Observable<SubTest[]>;
    }
}