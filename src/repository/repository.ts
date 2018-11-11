export interface Repository<T> {
    
    add(item: T) : void

    update(item: T): void

    delete(item: T): void

    // all(): any

    // list(item: T): any

}