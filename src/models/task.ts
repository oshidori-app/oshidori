import { Document } from "./document";
import { Collection } from "./collection";

export class Task extends Document implements Collection {

    public readonly collectionName: string = 'tasks';
    public ref: any;
    public parentRef: any = null;

    public id:    Number; // todo guid にしたいなぁ
    public title: string;
    public limit: Date;
    public src:   string;
    public status: string; // todo boolean にしたいなぁ
    public assign: string; // todo assignedTo にしたいなぁ

    constructor(id, title, limit, src, status, assign){
        super();
        this.id    = id;
        this.title = title;
        this.limit = limit;
        this.src   = src;
        this.status = status;
        this.assign = assign;
    }
}