import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {SecretListComponent} from "../secret-list/secret-list.component";

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/secrets',
        name: 'Secrets',
        component: SecretListComponent,
        useAsDefault: false
    }
])

@Component({
    selector: 'my-app',
    templateUrl: 'app/app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
export class AppComponent {
    title = 'web-vault';

}
