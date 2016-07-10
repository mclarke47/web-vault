import {Component, Injectable, Input, Output, EventEmitter} from "@angular/core";
import {VaultService} from "../vault-service";

@Component({
    selector: 'key-management',
    templateUrl: 'app/key-management/key-management.component.html',
    styleUrls: ['app/key-management/key-management.component.css'],
    providers: [VaultService]

})

@Injectable()
export class KeyManagementComponent {

    @Output() responseEmitter = new EventEmitter<string>();
    @Output() accessKeyEmitter = new EventEmitter<string>();
    rootToken;
    accessKey;

    constructor(private service:VaultService) {
    }

    newKey() {

        if (this.rootToken == null || this.rootToken == "") {
            this.responseEmitter.emit("provide a root token first");
        } else {
            this.service.newToken(this.rootToken)
                .then(resp => {
                    let token = resp.auth.client_token;
                    this.accessKey = token;
                    this.accessKeyEmitter.emit(token);
                    this.responseEmitter.emit("new key created");
                });
        }

    }

    onAccessKeyChange(value){
        this.accessKeyEmitter.emit(this.accessKey);
    }

}