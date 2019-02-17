import { Injectable, Injector } from '@angular/core';
import { Comment } from "../models/comment";
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';

@Injectable()
export class CommentRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
    }

    public add(comment: Comment): Promise<any> {
        return super.addDocument(comment);
    }

    public update(comment: Comment): Promise<any> {
        return super.updateDocument(comment);
    }

    public delete(comment: Comment): void {
        throw new Error('not implemented');
    }

    public list(comment: Comment): Observable<Comment[]> {
        return super.listDocument(comment) as Observable<Comment[]>;
    }
}