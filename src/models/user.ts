import { Collection } from './collection';
import { Document } from './document';
import { SubCollection } from './sub-collection';

export class User extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'users';
    ref: any;
    parentRef: any;

    // field
    userId: string;
    gender: string;
    birthdate: string;
    groupRef: any;

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }
}

export let Gender = {
    Male: 0,
    Female: 1,
    Other: 2,
    [0]: '男性',
    [1]: '女性',
    [2]: 'その他',
  };
