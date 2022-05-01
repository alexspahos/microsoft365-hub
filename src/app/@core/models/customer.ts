export interface Customer {
    id: string;
    name: string;
    email: string;
    contact: {
        mobilePhone: string;
        telephone: string;
    };
}
