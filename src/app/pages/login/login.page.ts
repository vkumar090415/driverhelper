import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Login, Details } from 'src/app/models/user';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

// import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
// private  authService:  AuthService,
  constructor( private  authService:  AuthService, private  router:  Router, private toastController: ToastController,public storage: Storage) { }
  userr:Login;
  loading: boolean;
  authState = new BehaviorSubject(false);
  ngOnInit() {
  }
  login2(form){
     this.authService.login(form.value).subscribe((res)=>{
       console.log(res)
      this.router.navigateByUrl('dashboard');
    }); 
  }

  login(form) {
    //console.log(form.value);
    this.loading = true;

     this.authService.login(form.value).subscribe(async (data:any) => {
      //this.router.navigateByUrl('home');
      console.log(data);
      this.userr=data;
      sessionStorage.clear();
      this.storage.clear();
      this.loading = false;
     // console.log(this.userr);
if(this.userr.success!="1")
{
      form.reset();
      
      const toast = await this.toastController.create({
        header: '',
        message: this.userr.message,
        position: 'middle',
        duration: 15000,
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              //this.nav.navigateForward('/login');
              // this.router.navigate(['/login']);
            }
          }
        ]
      });
      toast.present();
    }
    else
    {      
      /* this.storage.set('name', this.userr);
      sessionStorage.setItem('userdata', JSON.stringify( this.userr.Details));
      this.router.navigateByUrl('myprofile');
 */
      this.storage.set('USER_INFO', JSON.stringify( this.userr.Details)).then((response) => {
        this.router.navigate(['dashboard']);
        this.authState.next(true);
      });
    }
    }); 
  }
}
