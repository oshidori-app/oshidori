import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '../models/comment';

import { BaseRepository } from './base.repository';

@Injectable()
export class CommentRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
    }

    add(comment: Comment): Promise<any> {
        return super.addDocument(comment);
    }

    update(comment: Comment): Promise<any> {
        return super.updateDocument(comment);
    }

    delete(comment: Comment): void {
        throw new Error('not implemented');
    }

    list(comment: Comment): Observable<Comment[]> {
        return super.listDocument(comment) as Observable<Comment[]>;
    }
}
