import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';
import { Customer } from '../../@core/models/customer';
import { CustomerService } from '../../@core/services/customer.service';

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

export class Claim {
    id: number;
    claim: string;
    value: string;
}

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    account: AccountInfo;
    profile: ProfileType;
    claimsList: Claim[] = [];
    customer: Customer;

    constructor(
        private msalService: MsalService,
        private httpClient: HttpClient,
        private customerService: CustomerService,
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
        this.getClaims(this.account.idTokenClaims);
    }

    getClaims(claims: any) {
        const list: Claim[]  =  new Array<Claim>();
        Object.keys(claims).forEach(function(k, v) {
            const c = new Claim();
            c.id = v;
            c.claim = k;
            c.value =  claims ? claims[k] : null;
            list.push(c);
        });

        this.claimsList = list;
    }

    getProfile() {
        // tslint:disable-next-line: deprecation
        this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(res => this.profile = res);
    }

    getCustomer() {
        this.customerService.getCustomer('3fa85f64-5717-4562-b3fc-2c963f66afa6').subscribe(res => this.customer = res);
    }
}
