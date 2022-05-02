/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
    production: true,
};

export const protectedResources = {
    auditCustomerApi: {
        endpoint: 'https://audit-customer-api.azurewebsites.net/Customer',
        scopes: ['api://audit-customer-api/customers.read', 'api://audit-customer-api/customers.write'],
    },
};
