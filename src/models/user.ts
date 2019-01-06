import { Entity } from "./entity";

export class User implements Entity {

    public userId: string
    public gender: string
    public birthdate: string

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    public getEntityName() {
        return 'users'
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
  