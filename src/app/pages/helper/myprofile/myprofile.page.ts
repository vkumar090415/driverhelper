import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Login, Details } from 'src/app/models/user';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  // userr:Login;
  data: Details;
  usert: String = "Driver";
  status: String = "In-Active";
  constructor(private storage: Storage) {


  }

  async ngOnInit() {
    console.log('myprofile init');
    //this.data = JSON.parse(sessionStorage.getItem('userdata'));
    this.data = JSON.parse(await this.storage.get('USER_INFO'));
    if (this.data.user_type == "2")
      this.usert = "Helper";

    if (this.data.is_active == true)
      this.status = "Active";
      
    console.log(this.data);
    // this.storage.get('name').then((val) => {
    //console.log(val)
    // this.userr=val.Details;

    // });
  }

}
