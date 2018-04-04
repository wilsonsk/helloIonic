import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TripDetailsPage } from '../trip-details/trip-details';

import { UserService } from '../../services/user';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage implements OnInit {
  trips: any[];
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    if(this.navParams.get('user') === "sky" && this.navParams.get('password') === "p"){
      return true;
    }
    return false;
  }

  ngOnInit() {
    // Drively API call to grab user's schedule data
    // Set userService properties to match API trip data and output to view
    this.userService.user.username = this.navParams.get('user');
    this.userService.user.password = this.navParams.get('password');

    this.username = this.userService.user.username;
    this.password = this.userService.user.password;
    this.trips = this.userService.trips;
  }

  tripDetails(tripData: {name:string, address:string}) {
    this.navCtrl.push(TripDetailsPage, tripData);
  }

}
