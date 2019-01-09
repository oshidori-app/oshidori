import { Entity } from "./entity";

export class Task implements Entity {
    getEntityName(): string {
        return 'tasks';
    }   
    public id:    Number; // todo guid にしたいなぁ
    public title: string;
    public limit: Date;
    public src:   string;
    public status: string; // todo boolean にしたいなぁ
    public assign: string; // todo assignedTo にしたいなぁ

    constructor(id, title, limit, src, status, assign){
        this.id    = id;
        this.title = title;
        this.limit = limit;
        this.src   = src;
        this.status = status;
        this.assign = assign;
    }
}