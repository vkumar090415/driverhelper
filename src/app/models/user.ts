export  class  User {

    auth_key: string;
    
    user_type: number;
    
    name: string;
    
    email_id: string;

    mobile_no: string;

    address:string;

    location:string;

    latitude:String;

    longitude:String;

    postal_code:string;

    password:String;

    cnf_password:String;
    
    
    constructor(values: Object = {}) {
    
    Object.assign(this, values);
    
    }
    
    }

    export class Details {
        id: string;
        user_group_id: string;
        profile_name: string;
        username: string;
        user_type: string;
        email_id: string;
        mobile_no: string;
        profile_pic?: any;
        address: string;
        location: string;
        lat: string;
        lon: string;
        postcode: string;
        is_active:boolean;
    }

    export class Login {
        success: string;
        message: string;
        Details: Details;
    }
    export class LoginResp {
        login: Login;
        onstructor(values: Object = {}) {
        
            Object.assign(this, values);
            
            }
    }