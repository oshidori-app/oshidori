import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task';

import { BaseRepository } from './base.repository';

@Injectable()
export class TaskRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
    }

    add(task: Task): Promise<any> {
        return super.addDocument(task);
    }

    update(task: Task): void {
        throw new Error('not implemented');
    }

    delete(task: Task): void {
        throw new Error('not implemented');
    }

    list(task: Task): Observable<Task[]> {
        return super.listDocument(task) as Observable<Task[]>;
    }
}
