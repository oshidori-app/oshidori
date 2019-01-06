import { Entity } from "../models/entity";

export interface Repository<T extends Entity>{
    
    add(item: T) : void

    update(item: T): void

    delete(item: T): void

    // all(): any

    // list(item: T): any

}