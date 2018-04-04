import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private username: string;
  private password: string;

  // Grab username/Password
  // Drively API call to check username/Password
  //

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onUsername(event:any) {
    this.username = event.target.value;
  }

  onPassword(event:any) {
    this.password = event.target.value;
  }

  onLogin() {
    this.navCtrl.push(SchedulePage, {user: this.username, password: this.password})
      .then((response) => {
        if(!response) {
          alert('Access Denied: Wrong Username and Password')
        }
      });
  }
}
