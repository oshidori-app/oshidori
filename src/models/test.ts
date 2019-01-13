import { Entity } from "./entity";

export class Test implements Entity{
    public groupId: string   
    public userId: string
    public title: string
    public description: string
    public imgUrl: string

    constructor(init?: Partial<Test>) {
        Object.assign(this, init);
    }

    public getEntityName() {
        return 'tests'
    }
}