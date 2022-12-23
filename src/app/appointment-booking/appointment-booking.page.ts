import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.page.html',
  styleUrls: ['./appointment-booking.page.scss'],
})
export class AppointmentBookingPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoBack() {
    this.navCtrl.pop();
  }


}
