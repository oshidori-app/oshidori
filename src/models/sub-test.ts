import { Collection } from './collection';
import { Document } from './document';

/**
 * 開発用：testsコレクションのサブコレクションであるsub-testsのドキュメント
 *
 * @export
 * @class SubTest
 * @extends {Test}
 */
export class SubTest extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'sub-tests';
    ref: any;
    parentRef: any;

    // field
    groupId: string;
    userId: string;
    title: string;
    description: string;
    imgUrl: string;

    constructor(init?: Partial<SubTest>) {
        super();
        Object.assign(this, init);
    }
}
