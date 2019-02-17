export interface Collection {

    /**
     * コレクション名
     *
     * @type {string}
     * @memberof Collection
     */
    readonly collectionName: string;

    /**
     * 自身のドキュメントの参照
     *
     * @type {*}
     * @memberof Collection
     */
    ref: any;

    /**
     * 親ドキュメントの参照
     *
     * @type {*}
     * @memberof Collection
     */
    parentRef: any;
}
