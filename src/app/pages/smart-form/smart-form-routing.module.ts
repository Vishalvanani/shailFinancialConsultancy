import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartFormPage } from './smart-form.page';

const routes: Routes = [
  {
    path: '',
    component: SmartFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartFormPageRoutingModule {}
