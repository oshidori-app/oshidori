
export interface Collection {

    collectionName: string;
    /**
     * ドキュメントが所属するコレクションの名前を取得する
     *
     * @returns {string}
     * @memberof Collection
     */
    getCollectionName(): string;

    getSelfRef(): string;
}