import { Collection } from './collection';
import { Document } from './document';

/**
 * keepsコレクションのドキュメント
 *
 * @export
 * @class Keep
 * @extends {Document}
 */
export class Keep extends Document implements Collection {

    // meta field
    readonly collectionName: string = 'keeps';
    ref: any;
    parentRef: any;

    // field
    groupId: string;
    userId: string;
    title: string;
    imgUrl: string;
    memo: string;
    decisionFlg: boolean;

    constructor(init?: Partial<Keep>) {
        super();
        Object.assign(this, init);
    }
}
