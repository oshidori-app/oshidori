import { Document } from "./document";
import { Collection } from "./collection";

/**
 * 開発用：testsコレクションのドキュメント
 *
 * @export
 * @class Keep
 * @extends {Document}
 */
export class Keep extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'keeps';
    public ref: any;
    public parentRef:any = null; // ルートドキュメントはnullを入れてもらう必要あり。頑張ってもいいけどとりあえずこれで...
    
    // field
    public groupId: string   
    public userId: string
    public title: string
    public imgUrl: string
    public ｄecisionFlg: boolean

    constructor(init?: Partial<Keep>) {
        super();
        Object.assign(this, init);
    }
}