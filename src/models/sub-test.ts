import { Document } from './document';
import { Collection } from './collection';

/**
 * 開発用：testsコレクションのサブコレクションであるsub-testsのドキュメント
 *
 * @export
 * @class SubTest
 * @extends {Test}
 */
export class SubTest extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'sub-tests';
    public ref: any;
    public parentRef: any;

    // field
    public groupId: string;
    public userId: string;
    public title: string;
    public description: string;
    public imgUrl: string;

    constructor(init?: Partial<SubTest>) {
        super();
        Object.assign(this, init);
    }
}
