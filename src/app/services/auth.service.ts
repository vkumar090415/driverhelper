import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User, LoginResp } from '../models/user';
import { ApiToken } from '../models/apitoken';
import { TokenResp, RegistrationResp } from '../models/tokenresp';
import { Loginm } from '../models/loginm';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  baseUrl = 'http://www.lumperdispatch.com/webservice/services/';
  apiKey = 'AUTH_test_610dcc3a-bd0b-44bd-90bc-b65be6234a77'; // <-- Enter your own key here!
  _url: string;
  authState = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private platform: Platform, private storage: Storage) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  getToken(item) {
    this._url = this.baseUrl + "get_token";
    return this.httpClient.post(this._url, item, {
      headers: new HttpHeaders({ "Accept": "application/json" })
    })
      .pipe(
        map((data: TokenResp) => {
          return data.get_token;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  createUser(user, _auth_key) {
    this._url = this.baseUrl + "registration";
    user.latitude = "36.7783° N";
    user.longitude = "119.4179° W";

    //user.user_type=1;
    console.log(user);
    var formData: any = new FormData();
    formData.append("auth_key", _auth_key);
    formData.append("user_type", user.user_type);
    formData.append("name", user.name);
    formData.append("email_id", user.email_id);
    formData.append("mobile_no", user.mobile_no);
    formData.append("address", user.address);
    formData.append("location", user.address);
    formData.append("latitude", user.latitude);
    formData.append("longitude", user.longitude);
    formData.append("postal_code", user.postal_code);
    formData.append("password", user.password);
    formData.append("cnf_password", user.cnf_password);

    return this.httpClient.post(this._url, formData, {
      headers: new HttpHeaders({ "Accept": "application/json" })
    })
      .pipe(
        map((data: RegistrationResp) => {
          return data.registration;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(l) {
    const headers = { 'content-type': 'multipart/form-data' };
    var formData: any = new FormData();
    formData.append("auth_key", "AUTH_test_610dcc3a-bd0b-44bd-90bc-b65be6234a77");
    formData.append("email_mobile", l.email_mobile);
    formData.append("userkey", l.userkey);
    console.log(formData);
    return this.httpClient
      .post(this.baseUrl + 'login', formData, {
        headers: new HttpHeaders({ "Accept": "application/json" })
      })
      .pipe(
        map((data: LoginResp) => {
          return data.login;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );

  }
}
