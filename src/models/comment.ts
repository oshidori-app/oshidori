import { Document } from "./document";
import { Collection } from "./collection";

/**
 * 開発用：commentコレクションのドキュメント
 *
 * @export
 * @class Comment
 * @extends {Document}
 */
export class Comment extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'cba_chat';
    public ref: any;
    public parentRef:any = null; // ルートドキュメントはnullを入れてもらう必要あり。頑張ってもいいけどとりあえずこれで...
    
    // field
    public groupId: string   
    public userId: string
    public comment: string

    constructor(init?: Partial<Comment>) {
        super();
        Object.assign(this, init);
    }
}
