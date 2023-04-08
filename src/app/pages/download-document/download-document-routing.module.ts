import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadDocumentPage } from './download-document.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadDocumentPageRoutingModule {}
