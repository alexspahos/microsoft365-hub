import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';
import { createImmediatelyInvokedFunctionExpression } from 'typescript';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    account: AccountInfo;

    constructor(
        private msalService: MsalService,
    ) { }

    ngOnInit() {
        this.getAccount();
    }

    isLoggedIn(): boolean {
        return this.msalService.instance.getActiveAccount() != null;
    }

    logout() {
        this.msalService.logout();
    }

    getAccount() {
        this.account = this.msalService.instance.getActiveAccount();
    }
}
