import { Injectable, Injector } from '@angular/core';
import { User } from "../models/user";
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {

    constructor(injector: Injector) {
        super(injector);
     }

    add(user: User): Promise<any> {
        return super.add(user);
    }

    update(user: User): void {
        throw new Error('not implemented');
    }

    delete(user: User): void {
        throw new Error('not implemented');
    }
}