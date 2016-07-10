import {Component, OnInit, Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {VaultService} from "../vault-service";
import {KeyManagementComponent} from "../key-management/key-management.component";
import {SealComponent} from "../seal/seal.component";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css'],
    providers: [VaultService],
    directives: [ KeyManagementComponent, SealComponent]

})

@Injectable()
export class DashboardComponent implements OnInit {

    response = "loading...";
    accessKey = "";
    isSealed = true;
    isError = false;
    isInfo = true;
    secretPath = "";

    constructor(private service:VaultService) {
    }

    ngOnInit():any {
        this.response = "checking vault seal status..";
        //this.getSealStatus();
        return undefined;
    }

    updateResponse(response) {
        this.response = response;
    }

    updateSealStatus(isSealed) {
        this.isSealed = isSealed;
    }

    updateAccessKey(accessKey) {
        this.accessKey = accessKey;
    }

}

