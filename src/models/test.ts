import { Collection } from './collection';
import { Document } from './document';

/**
 * 開発用：testsコレクションのドキュメント
 *
 * @export
 * @class Test
 * @extends {Document}
 */
export class Test extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'tests';
    ref: any;
    parentRef: any = null; // ルートドキュメントはnullを入れてもらう必要あり。頑張ってもいいけどとりあえずこれで...

    // field
    groupId: string;
    userId: string;
    title: string;
    description: string;
    imgUrl: string;

    constructor(init?: Partial<Test>) {
        super();
        Object.assign(this, init);
    }
}
