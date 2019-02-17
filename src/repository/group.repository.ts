import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { Group } from '../models/group';

@Injectable()
export class GroupRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(group: Group, docId: string): Promise<any> {
        return super.setDocument(group, docId);
    }

    public update(group: Group): Promise<any> {
        return super.updateDocument(group);
    }

    public delete(group: Group): void {
        throw new Error('not implemented');
    }

    public list(group: Group): Observable<Group[]> {
        return super.listDocument(group) as Observable<Group[]>;
    }

    public find(docRef: string): Observable<Group> {
        return super.findDocument(docRef) as Observable<Group>;
    }
}
