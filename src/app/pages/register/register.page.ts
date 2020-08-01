import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ApiToken } from 'src/app/models/apitoken';
import { GetToken, Registration } from 'src/app/models/tokenresp';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  latitude: number;
  longitude: number;
  regForm: any;
  // matching_passwords_group: FormGroup;
  token: ApiToken;
  tokenr: GetToken;
  userr: Registration;
  _auth_key: String;
  loading: boolean;
  submitted = false;

  constructor(private authService: AuthService, private router: Router,
    public toastController: ToastController, public formBuilder: FormBuilder
  ) { }

  areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    }
  }
  validation_messages = {
    'name': [{ type: 'required', message: 'Name is required.' }, { type: 'maxlength', message: 'Name cannot be more than 50 characters long.' }],
    'mobile_no': [{ type: 'required', message: 'Mobile is required.' }, { type: 'maxlength', message: 'Mobile cannot be more than 15 digits long.' }],
    'address': [{ type: 'required', message: 'Address is required.' }],
    'postal_code': [{ type: 'required', message: 'Postal Code is required.' }, { type: 'maxlength', message: 'Postal Code cannot be more than 10 characters long.' }],
    'user_type': [{ type: 'required', message: 'RegisterAs required.' }],
    'email_id': [
      { type: 'required', message: 'Email Id is required.' },
      { type: 'pattern', message: 'Invalid email address.' }
    ],
    /* 
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'cnf_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ], */
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],

  }
  ngOnInit() {

    /* this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      cnf_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return this.areEqual(formGroup);
    });
 */
    this.regForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email_id: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobile_no: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      address: ['', Validators.required],
      postal_code: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      user_type: ['', Validators.required],
      password: ['', Validators.required],
      cnf_password: ['', Validators.required],
   //   matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))    
    } );
    let fData: FormData = new FormData;
    fData.append("pass_key", 'DA_test_OAnSOZOoOkaSZJ6Ok3xdWQEt');
    this.authService.getToken(fData).subscribe((data: any) => {

      this.tokenr = data;
      if (this.tokenr.success == 1)
        this._auth_key = this.tokenr.Details.auth_key;
      // console.log(this.tokenr.Details.auth_key);
    });

  }
  onSubmit2(values){
    console.log(values);
    //this.router.navigate(["/user"]);
  }
  onSubmit(values) {
    //console.log(form.value);
    this.submitted = true;
    
    if (this.regForm.valid) {
      this.loading = true;
      this.authService.createUser(this.regForm.value, this._auth_key).subscribe(async (data: any) => {
        //this.router.navigateByUrl('home');
        console.log(data);
        this.userr = data;
        this.loading = false;
        // console.log( this.userr);
        if (this.userr.success == 1) {
          console.log(this.userr.success);
          this.regForm.reset();
          const toast = await this.toastController.create({
            header: '',
            message: this.userr.message,
            position: 'middle',
            buttons: [
              {
                text: 'Login',
                role: 'cancel',
                handler: () => {
                  // console.log('Cancel clicked');

                  this.router.navigate(['/login']);
                }
              }
            ]
          });
          toast.present();
        }
        else {
          console.log(this.userr.success);
          const toast = await this.toastController.create({
            header: '',
            message: this.userr.message,
            position: 'middle',
            buttons: [
              {
                text: 'Close',
                role: 'cancel',
                handler: () => {
                  //  console.log('Cancel clicked');

                }
              }
            ]
          });
          toast.present();

        }
      });
    }
  }
}


