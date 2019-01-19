import { Document } from "./document";
import { Collection } from "./collection";

/**
 * tasksコレクションのドキュメント
 *
 * @export
 * @class Task
 * @extends {Document}
 */
export class Task extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'tasks';
    public ref: any;
    public parentRef: any = null;

    // field
    public id:    Number; // todo guid にしたいなぁ
    public title: string;
    public limit: Date;
    public src:   string;
    public status: string; // todo boolean にしたいなぁ
    public assign: string; // todo assignedTo にしたいなぁ

    constructor(init?: Partial<Task>) {
        super();
        Object.assign(this, init);
    }
}
