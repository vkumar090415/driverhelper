export class Details {
    auth_key: string;
   
}

export class GetToken {
    success: number;
    message: string;
    Details: Details;
    
}

export class TokenResp {
    get_token: GetToken;
    onstructor(values: Object = {}) {
    
        Object.assign(this, values);
        
        }
}
export class Registration {
    success: number;
    message: string;
    Details: any[];
}
export class RegistrationResp {
    registration: Registration;
    onstructor(values: Object = {}) {
    
        Object.assign(this, values);
        
        }
}