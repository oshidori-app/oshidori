import { Collection } from "../models/collection";

export interface Repository {
    
    addDocument(item: Collection) : void

    updateDocument(item: Collection): void

    listDocument(item: Collection) : any

}