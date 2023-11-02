export interface authUser {
  email: string;
  password: string;
}

export class registerModule {
  first_name?: string;
  last_name?: string;
  email_address?: string;
  phone_number?: string;
  city?: string;
}

export class storeAddressModule {
  AddressLine2?:string ;
  PostalCode?:string ;
  city?:any ;
  region?:any ;
  street?:any ;
  subregion?:string;
  address?:string;
  country?:string;
  district?:string;
  isoCountryCode?:string;
  name?:string;
  streetNumber?:string;
 
}
