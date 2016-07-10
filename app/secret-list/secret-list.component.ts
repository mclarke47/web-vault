import {VaultService} from "../vault-service";
import {Component, Injectable, EventEmitter, Output, Input, OnInit} from "@angular/core";
import {KeyManagementComponent} from "../key-management/key-management.component";

@Component({
    selector: 'secret-list',
    templateUrl: 'app/secret-list/secret-list.component.html',
    styleUrls: ['app/secret-list/secret-list.component.css'],
    providers: [VaultService, KeyManagementComponent],
    directives: [KeyManagementComponent]

})

export class SecretListComponent implements OnInit {

    accessKey = ""; //Put a key here to make testing easier
    @Input() isSealed;
    @Output() responseEmitter = new EventEmitter<string>();

    currentPath = "/";
    secretValue = "";

    secrets = [];

    constructor(private service:VaultService) {
    }

    ngOnInit():any {
        this.getSecrets();
    }
    
    getSecrets() {

        if(this.currentPath == null || this.currentPath == ""){
            this.currentPath = "/";
        }

        if (this.accessKey == "" || this.accessKey == null) {
            this.responseEmitter.emit("provide and access token");
        }
        else {
            this.service.getSecretsAtPath(this.accessKey, this.currentPath)
                .then(resp => {
                    this.secrets = resp.data.keys;
                });
        }
    }

    onSelect(secret){
        if(secret.indexOf('/') >= 0){
            this.currentPath += secret;
            this.getSecrets();
        } else {
            if (this.accessKey == "") {
            }
            else {
                this.service.getSecret(this.accessKey, this.currentPath + secret)
                    .then(resp => {
                        this.secretValue = resp.data.value;
                    });
            }
        }
    }

    saveSecret() {
        if (this.accessKey == "") {
            this.responseEmitter.emit("provide an access token");
        }
        else {
            this.service.save(this.accessKey, this.currentPath, this.secretValue)
                .then(resp => {
                    this.responseEmitter.emit("secret saved!");
                });
        }
    }

    updateAccessKey(accessKey) {
        this.accessKey = accessKey;
    }
}