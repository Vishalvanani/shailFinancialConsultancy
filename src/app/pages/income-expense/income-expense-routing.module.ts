import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeExpensePage } from './income-expense.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeExpensePageRoutingModule {}
