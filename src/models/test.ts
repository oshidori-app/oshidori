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

    // meta field
    public readonly collectionName: string = 'tests';
    public ref: any;
    public parentRef:any = null; // ルートドキュメントはnullを入れてもらう必要あり。頑張ってもいいけどとりあえずこれで...
    
    // field
    public groupId: string   
    public userId: string
    public title: string
    public description: string
    public imgUrl: string

    constructor(init?: Partial<Test>) {
        super();
        Object.assign(this, init);
    }
}