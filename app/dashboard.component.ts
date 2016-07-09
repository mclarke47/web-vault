import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {VaultService} from "./vault-service";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    providers: [VaultService]

})

@Injectable()
export class DashboardComponent implements OnInit {

    response = "loading...";
    secretPath = "";
    secretValue = "";
    accessKey = "";
    rootToken = "";
    secretValueGet = "";
    secretGetValue = "";
    isSealed = true;

    constructor(private service:VaultService) {
    }

    ngOnInit():any {
        this.response = "checking vault initialization status";
        this.getSealStatus();
        return undefined;
    }

    unsealVault() {
        this.getSealStatus().then(isSealed => {
            if (isSealed) {
                this.service.unseal(this.accessKey)
                    .then(resp => this.isSealed = false);
            }
            else {
                this.response = "vault is already unsealed"
            }
        });
    }

    sealVault() {

        this.getSealStatus().then(isSealed => {
            if (isSealed) {
                this.response = "vault is already sealed"
            }
            else {
                if (this.accessKey == null || this.accessKey == "") {
                    this.newKey()
                        .then(key => {
                            this.service.seal(key)
                                .then(resp => this.isSealed = true);
                        });
                } else {
                    this.service.seal(this.accessKey)
                        .then(resp => this.isSealed = true);
                }

            }
        });
    }

    getSealStatus() {
        return this.service.sealStatus()
            .then(resp => {
                this.isSealed = resp.sealed;
                return resp.sealed;
            });
    }

    newKey() {
        return this.service.newToken(this.rootToken)
            .then(resp => {
                this.accessKey = resp.auth.client_token;
                this.response = "new key created";
                return resp.auth.client_token;
            });
    }

    saveSecret() {
        this.service.save(this.accessKey, this.secretPath, this.secretValue)
            .then(resp => this.response = "secret saved!");
    }

    getSecret() {
        this.service.getSecret(this.accessKey, this.secretPath)
            .then(resp => {
                this.secretGetValue = resp.data.value;
            });
    }
}

