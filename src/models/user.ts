import { Document } from "./document";
import { SubCollection } from "./sub-collection";
import { Collection } from "./collection";

export class User extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'users';
    public ref: any;
    public parentRef: any;

    // field
    public userId: string
    public gender: string
    public birthdate: string
    public groupRef: any

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
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
  