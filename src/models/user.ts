import { Document } from "./document";
import { SubCollection } from "./sub-collection";
import { Collection } from "./collection";

export class User extends Document implements Collection {
    public readonly collectionName: string = 'users';

    public userId: string
    public gender: string
    public birthdate: string

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }

    public getCollectionName() {
        return this.collectionName;
    }

    getSelfRef() {
        return this.ref;
    }
}

export var Gender = {
    Male: 0,
    Female: 1,
    Other: 2,
    [0]: "男性",
    [1]: "女性",
    [2]: "その他"
  }
  