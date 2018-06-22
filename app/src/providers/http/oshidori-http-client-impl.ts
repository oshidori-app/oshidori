import { Injectable, Component } from '@angular/core';
import AgClientFactory from 'aws-api-gateway-client';

declare var AWS: any;

/**
 * AWS用のHTTPClient実装
 */
export class OshidoriHttpClientImpl {
    private agClient;
    private reqInfo;

    constructor() {
        this.init();
    }

    init() {
        AWS.config.apiCredentials.invokeUrl = 'https://h0sm1fg6ub.execute-api.ap-northeast-1.amazonaws.com/Development'
        this.agClient = AgClientFactory.newClient(AWS.config.apiCredentials);
    }

    invokeAPI(req: {
        params: any;
        additionalParams: any;
        body: any;
        pathTemplate: string;
        method: string;
    }) {
        return this.agClient.invokeApi(req.params, req.pathTemplate, req.method, req.additionalParams, req.body)
    }
}