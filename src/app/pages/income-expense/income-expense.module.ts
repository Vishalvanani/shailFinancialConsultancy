import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeExpensePageRoutingModule } from './income-expense-routing.module';

import { IncomeExpensePage } from './income-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomeExpensePageRoutingModule
  ],
  declarations: [IncomeExpensePage]
})
export class IncomeExpensePageModule {}
