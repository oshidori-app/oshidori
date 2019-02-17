import { Document } from "./document";
import { Collection } from "./collection";

/**
 * keepsコレクションのドキュメント
 *
 * @export
 * @class Keep
 * @extends {Document}
 */
export class Keep extends Document implements Collection {

    // meta field
    public readonly collectionName: string = 'keeps';
    public ref: any;
    public parentRef:any;

    // field
    public groupId: string   
    public userId: string
    public title: string
    public imgUrl: string;
    public memo: string
    public decisionFlg: boolean

    constructor(init?: Partial<Keep>) {
        super();
        Object.assign(this, init);
    }
}
