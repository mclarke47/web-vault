import {VaultService} from "../vault-service";
import {Component, Injectable, EventEmitter, Output, Input, OnInit} from "@angular/core";

@Component({
    selector: 'signin',
    templateUrl: 'app/signin/signin.component.html',
    styleUrls: ['app/signin/signin.component.css'],
    providers: [VaultService]

})

export class SignInComponent implements OnInit {

    accessToken;
    errorMessage;

    constructor(private service:VaultService) {
    }

    ngOnInit():any {
        return undefined;
    }

    validateToken(){
        if(this.accessToken === "" || this.accessToken == null){
            this.errorMessage = "please enter your access token"
        } else {
            
        }
    }
    
}