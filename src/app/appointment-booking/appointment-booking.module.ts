import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentBookingPageRoutingModule } from './appointment-booking-routing.module';

import { AppointmentBookingPage } from './appointment-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentBookingPageRoutingModule
  ],
  declarations: [AppointmentBookingPage]
})
export class AppointmentBookingPageModule {}
