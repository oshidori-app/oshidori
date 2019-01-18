import { Document } from "./document";
import { Collection } from "./collection";

/**
 * 開発用：testsコレクションのドキュメント
 *
 * @export
 * @class Test
 * @extends {Document}
 */
export class Test extends Document implements Collection {
    public readonly collectionName: string = 'tests';
    
    public groupId: string   
    public userId: string
    public title: string
    public description: string
    public imgUrl: string

    constructor(init?: Partial<Test>) {
        super();
        Object.assign(this, init);
    }

    public getCollectionName() {
        return this.collectionName;
    }

    public getSelfRef() {
        return this.ref;
    }
}