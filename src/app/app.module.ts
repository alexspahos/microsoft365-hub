/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
    NbButtonModule,
} from '@nebular/theme';
import {
    MsalModule,
    MsalInterceptor,
    MSAL_INSTANCE,
    MsalService,
    MsalGuardConfiguration,
    MSAL_GUARD_CONFIG,
    MsalGuard,
    MsalBroadcastService,
    MsalInterceptorConfiguration,
    MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { LoginComponent } from './auth/login/login.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
    // tslint:disable-next-line: no-console
    console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            clientId: 'a10d0af6-6eab-49a6-915d-7be4f1eeb43c', // This is your client ID
            redirectUri: 'http://localhost:4200', // This is your redirect URI
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
        },
        system: {
            loggerOptions: {
                loggerCallback,
                logLevel: LogLevel.Info,
                piiLoggingEnabled: false,
            },
        },
    });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
    };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes: ['user.read'],
        },
        loginFailedRoute: '/login-failed',
    };
}

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        NbButtonModule,
        MsalModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true,
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory,
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory,
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory,
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
