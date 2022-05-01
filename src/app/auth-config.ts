import { BrowserCacheLocation, Configuration, LogLevel } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
    console.log(message);
}

export const msalConfig: Configuration = {
    auth: {
        clientId: '3058f980-a000-4fc7-83ad-dff7528d72b8', // This is your client ID
        authority: 'https://login.microsoftonline.com/70118cd1-1ce9-4850-9978-f6cb288d7710',
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
};

export const protectedResources = {
    auditCustomerApi: {
      endpoint: 'http://localhost:15701/Customer',
      scopes: ['api://audit-customer-api/customers.read', 'api://audit-customer-api/customers.write'],
    },
};
