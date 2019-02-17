import { Injectable, Injector } from '@angular/core';
import { User } from '../models/user';
import { BaseRepository } from './base.repository';
import { Observable } from 'rxjs';

@Injectable()
export class UserRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
    }

    add(user: User, docId: string): Promise<any> {
        return super.setDocument(user, docId);
    }

    update(user: User): void {
        throw new Error('not implemented');
    }

    find(docRef: string): Promise<any> {
        return new Promise((resolve, reject) => {
            super.findDocument(docRef).subscribe(
            result => {
                resolve(result);
            },
            err => {
                reject(err);
            });
        });
    }

    delete(user: User): void {
        throw new Error('not implemented');
    }
}
