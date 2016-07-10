import {VaultService} from "../vault-service";
import {Component, Injectable, EventEmitter, Output, Input} from "@angular/core";

@Component({
    selector: 'create-secret',
    templateUrl: 'app/create-secret/create-secret.component.html',
    styleUrls: ['app/create-secret/create-secret.component.css'],
    providers: [VaultService]

})

@Injectable()
export class CreateSecretComponent {

    @Input() accessKey;
    @Input() isSealed;
    @Output() responseEmitter = new EventEmitter<string>();

    secretPath = "";
    secretValue = "";

    constructor(private service:VaultService) {
    }
    
    saveSecret() {
        if (this.accessKey == "") {
            this.responseEmitter.emit("provide an access token");
        }
        else {
            this.service.save(this.accessKey, this.secretPath, this.secretValue)
                .then(resp => {
                    this.responseEmitter.emit("secret saved!");
                });
        }
    }
}