import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseInquiryPage } from './course-inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: CourseInquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseInquiryPageRoutingModule {}
