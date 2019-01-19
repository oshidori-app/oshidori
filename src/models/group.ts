import { Document } from "./document";
import { SubCollection } from "./sub-collection";
import { Collection } from "./collection";

export class Group extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'groups';
    public ref: any;
    public parentRef: any = null;

    // field
    public name: string

    constructor(init?: Partial<Group>) {
        super();
        Object.assign(this, init);
    }
}