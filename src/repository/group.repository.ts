import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Group } from '../models/group';

import { BaseRepository } from './base.repository';

@Injectable()
export class GroupRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    add(group: Group, docId: string): Promise<any> {
        return super.setDocument(group, docId);
    }

    update(group: Group): Promise<any> {
        return super.updateDocument(group);
    }

    delete(group: Group): void {
        throw new Error('not implemented');
    }

    list(group: Group): Observable<Group[]> {
        return super.listDocument(group) as Observable<Group[]>;
    }

    find(docRef: string): Observable<Group> {
        return super.findDocument(docRef) as Observable<Group>;
    }
}
