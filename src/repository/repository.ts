import { Document } from "../models/document";
import { SubCollection } from "../models/sub-collection";
import { Collection } from "../models/collection";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";

export interface Repository {
    
    addDocument(item: Collection) : void


    updateDocument(item: Collection): void

    // delete(item: T): void

    // all(): any

    listDocument(item: Collection) : any

}