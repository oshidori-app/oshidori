import { Collection } from './collection';
import { Document } from './document';

/**
 * 開発用：commentコレクションのドキュメント
 *
 * @export
 * @class Comment
 * @extends {Document}
 */
export class Comment extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'cba_chat';
    ref: any;
    parentRef: any = null; // ルートドキュメントはnullを入れてもらう必要あり。頑張ってもいいけどとりあえずこれで...

    // field
    groupId: string;
    userId: string;
    comment: string;

    constructor(init?: Partial<Comment>) {
        super();
        Object.assign(this, init);
    }
}
