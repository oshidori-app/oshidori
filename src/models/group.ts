import { Collection } from './collection';
import { Document } from './document';
import { SubCollection } from './sub-collection';

export class Group extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'groups';
    ref: any;
    parentRef: any = null;

    // field
    name: string;
    connectCode: string;

    constructor(init?: Partial<Group>) {
        super();
        Object.assign(this, init);
    }
}
