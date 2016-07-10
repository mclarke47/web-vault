import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {SecretListComponent} from "../secret-list/secret-list.component";
import {SignInComponent} from "../signin/signin.component";

@RouteConfig([
    {
        path: '/signin',
        name: 'SignIn',
        component: SignInComponent,
        useAsDefault: true
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: false
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
