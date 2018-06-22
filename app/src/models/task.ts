export class Task {   
    public id:    Number;
    public title: string;
    public limit: Date;
    public src:   string;
    public status: string;
    public assign: string;

    constructor(id, title, limit, src, status, assign){
        this.id    = id;
        this.title = title;
        this.limit = limit;
        this.src   = src;
        this.status = status;
        this.assign = assign;
    }
}