import {VaultService} from "../vault-service";
import {Component, Injectable, EventEmitter, Output, Input, OnInit} from "@angular/core";

@Component({
    selector: 'seal',
    templateUrl: 'app/seal/seal.component.html',
    styleUrls: ['app/seal/seal.component.css'],
    providers: [VaultService]

})

@Injectable()
export class SealComponent implements OnInit {

    @Input() accessKey;
    @Output() responseEmitter = new EventEmitter<string>();
    @Output() sealStatusEmitter = new EventEmitter<boolean>();

    isSealed;
    
    constructor(private service:VaultService) {
    }

    ngOnInit():any {
        this.getSealStatus();
        return undefined;
    }

    sealVault() {

        if (this.accessKey == "") {
            this.responseEmitter.emit("provide an access token");
        }
        else {
            this.getSealStatus().then(isSealed => {
                if (isSealed) {
                    this.responseEmitter.emit("vault is already sealed");
                }
                else {
                    this.service.seal(this.accessKey)
                        .then(resp => this.changeSealedStatus(true));
                }
            });
        }
    }

    unsealVault() {

        if (this.accessKey == "") {
            this.responseEmitter.emit("provide an access token");
        }
        else {
            this.getSealStatus().then(isSealed => {
                if (isSealed) {
                    this.service.unseal(this.accessKey)
                        .then(resp => this.changeSealedStatus(false));
                }
                else {
                    this.responseEmitter.emit("vault is already unsealed");
                }
            });
        }
    }

    getSealStatus() {
        return this.service.sealStatus()
            .then(resp => {
                this.changeSealedStatus(resp.sealed);
                return resp.sealed;
            });
    }
    
    changeSealedStatus(value){
        this.isSealed = value;
        this.sealStatusEmitter.emit(value)
    }
}