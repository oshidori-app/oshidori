import { Injectable, Injector } from '@angular/core';
import { User } from "../models/user";
import { BaseRepository } from './base.repository';

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

    delete(user: User): void {
        throw new Error('not implemented');
    }
}