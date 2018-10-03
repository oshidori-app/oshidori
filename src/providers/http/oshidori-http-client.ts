import { Injectable, Component } from '@angular/core';
import { OshidoriHttpClientImpl } from './oshidori-http-client-impl';

export class OshidoriHttpClient {
    private impl: OshidoriHttpClientImpl;

    constructor() {
        this.impl = new OshidoriHttpClientImpl();
    }

    invokeAPI(req) {
        return this.impl.invokeAPI(req);
    }
}