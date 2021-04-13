import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private msalService: MsalService,
    ) { }

    ngOnInit(): void {
    }

    login() {
        // tslint:disable-next-line: deprecation
        this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(res.account);
            // tslint:disable-next-line: no-console
            console.log(res.account);
            this.router.navigate(['pages/dashboard']);
        });
    }

}
