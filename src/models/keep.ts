import { Document } from "./document";
import { Collection } from "./collection";

/**
 * tasksコレクションのドキュメント
 *
 * @export
 * @class Task
 * @extends {Document}
 */
export class Keep extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'keeps';
    public ref: any;

    // task
    public parentRef: any = null;

    // field
    public imageUrl: string;
    public memo: string

    constructor(init?: Partial<Keep>) {
        super();
        Object.assign(this, init);
    }
}
