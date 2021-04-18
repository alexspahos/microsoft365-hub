import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';

interface ProfileType {
    displayName?: string;
    givenName?: string;
    jobTitle?: string;
    mail?: string;
    mobilePhone?: string;
    preferredLanguage?: string;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
}

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    account: AccountInfo;
    profile: ProfileType;

    constructor(
        private msalService: MsalService,
        private httpClient: HttpClient,
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

    getProfile() {
        // tslint:disable-next-line: deprecation
        this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(res => this.profile = res);
    }
}
