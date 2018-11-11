import { Injectable, Injector } from '@angular/core';
import { Task } from "../models/task";
import { BaseRepository } from './base.repository';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {

    constructor(injector: Injector) {
        super(injector);
     }

    add(task: Task): Promise<any> {
        return super.add(task);
    }

    update(task: Task): void {
        throw new Error('not implemented');
    }

    delete(task: Task): void {
        throw new Error('not implemented');
    }
}