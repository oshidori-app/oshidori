import { Collection } from './collection';
import { Document } from './document';

/**
 * tasksコレクションのドキュメント
 *
 * @export
 * @class Task
 * @extends {Document}
 */
export class Task extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'tasks';
    ref: any;
    parentRef: any;

    // field
    title: string;
    done: boolean;
    imgUrl: string;

    constructor(init?: Partial<Task>) {
        super();
        Object.assign(this, init);
    }
}
