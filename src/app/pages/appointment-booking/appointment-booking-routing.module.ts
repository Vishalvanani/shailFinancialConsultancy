import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentBookingPage } from './appointment-booking.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentBookingPageRoutingModule {}
