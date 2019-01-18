import { Test } from "./test";
import { SubCollection } from "./sub-collection";

/**
 * 開発用：testsコレクションのサブコレクションであるsub-testsのドキュメント
 *
 * @export
 * @class SubTest
 * @extends {Test}
 */
export class SubTest extends Test implements SubCollection {
    public groupId: string   
    public userId: string
    public title: string
    public description: string
    public imgUrl: string

    constructor(init?: Partial<SubTest>) {
        super();
        Object.assign(this, init);
    }

    public getCollectionName() {
        return 'sub-tests'
    }

    public getParentRef() {
        return super.getSelfRef();
    }
}