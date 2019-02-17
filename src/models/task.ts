import { Document } from './document';
import { Collection } from './collection';

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
    public parentRef: any;

    // field
    public title: string;
    public done: boolean;
    public imgUrl: string;

    constructor(init?: Partial<Task>) {
        super();
        Object.assign(this, init);
    }
}
