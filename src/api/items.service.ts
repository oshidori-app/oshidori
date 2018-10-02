import { Injectable } from '@angular/core';
import { OshidoriHttpClient } from "../providers/http/oshidori-http-client";

@Injectable()
export class ItemsAPI {

    static pathTemplate: string = "/items"
    private oshidoriHttpClient: OshidoriHttpClient = new OshidoriHttpClient();

    constructor() {
    }

    initRequest(method: string, req: any) {
        req.pathTemplate = ItemsAPI.pathTemplate;
        req.method = method;

        return req;
    }

    getAll(req) {
        var method: string = "GET";
        var _req = this.initRequest(method, req);

        return this.oshidoriHttpClient.invokeAPI(_req);
    }

    update() {

    }

    delete() {

    }

}