
export interface SubCollection {

    collectionName: string;

    /**
     * ドキュメントが所属するコレクションの名前を取得する
     *
     * @returns {string}
     * @memberof Collection
     */
    getCollectionName(): string;
    /**
     * ドキュメントが所属するコレクションの名前を取得する
     *
     * @returns {string}
     * @memberof Collection
     */
    getParentRef(): string;
}