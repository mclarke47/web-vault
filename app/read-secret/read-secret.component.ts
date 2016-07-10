import {VaultService} from "../vault-service";
import {Component, Injectable, EventEmitter, Output, Input} from "@angular/core";

@Component({
    selector: 'read-secret',
    templateUrl: 'app/read-secret/read-secret.component.html',
    styleUrls: ['app/read-secret/read-secret.component.css'],
    providers: [VaultService]

})

export class ReadSecretComponent{

    @Input() accessKey;
    @Input() isSealed;
    @Output() responseEmitter = new EventEmitter<string>();

    secretPath = "";
    secretValue = "";

    constructor(private service:VaultService) {
    }
    
    getSecret() {
        if (this.accessKey == "") {
            this.responseEmitter.emit("provide and access token");
        }
        else {
            this.service.getSecret(this.accessKey, this.secretPath)
                .then(resp => {
                    this.secretValue = resp.data.value;
                });
        }
    }
}