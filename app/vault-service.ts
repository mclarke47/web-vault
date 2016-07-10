import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VaultService {

    private vaultUrl = 'http://local.me.com/v1/';  // URL to web api

    constructor(private http:Http) {
    }

    initStatus() {
        return this.http.get(this.vaultUrl + "sys/init")
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    init() {
        var body = {secret_shares: 1, secret_threshold: 1};
        return this.http.put(this.vaultUrl + "sys/init", body)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    seal(apiKey) {
        let headers = new Headers();
        headers.append("X-Vault-Token", apiKey);
        return this.http.put(this.vaultUrl + "sys/seal", {}, {
            headers: headers
        })
            .toPromise()
            .catch(this.handleError);
    }

    unseal(apiKey) {
        var body = {key: apiKey};
        return this.http.put(this.vaultUrl + "sys/unseal", body)
            .toPromise()
            .catch(this.handleError);
    }

    sealStatus() {
        return this.http.get(this.vaultUrl + "sys/seal-status")
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    save(apiKey:string, secretPath:string, secretValue:string) {
        var body = {value: secretValue};
        let headers = new Headers();
        headers.append("X-Vault-Token", apiKey);
        return this.http.post(this.vaultUrl + "secret" + secretPath, body, {
            headers: headers
        })
            .toPromise()
            .catch(this.handleError);
    }

    getSecret(accessKey:string, secretPath:string) {
        let headers = new Headers();
        headers.append("X-Vault-Token", accessKey);
        return this.http.get(this.vaultUrl + "secret" + secretPath, {
            headers: headers
        })
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getSecretsAtPath(accessKey:string, currentPath:string) {
        let headers = new Headers();
        headers.append("X-Vault-Token", accessKey);
        return this.http.get(this.vaultUrl + "secret" + currentPath + "?list=true", {
            headers: headers
        })
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => {
                error
            });
    }

    newToken(rootToken:any) {
        let headers = new Headers();
        headers.append("X-Vault-Token", rootToken);
        return this.http.post(this.vaultUrl + "auth/token/create", {}, {
            headers: headers
        })
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }
}