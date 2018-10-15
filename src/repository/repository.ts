export interface Repository<T> {
    
    // command系のみ
    add(item: T) : void

    update(item: T): void

    delete(item: T): void

    // query系は保留
    // all(): T[]

    // one(id: string): T

}