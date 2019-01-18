import { Document } from "../models/document";
import { SubCollection } from "../models/sub-collection";
import { Collection } from "../models/collection";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";

export interface Repository {
    
    addToRootCollection(item: Collection) : void

    addToSubCollection(item: SubCollection) : void


    updateRootCollection(item: Collection): void

    // delete(item: T): void

    // all(): any

    listByRootCollection(item: Collection) : any

    listBySubCollection(item: SubCollection) : any

}