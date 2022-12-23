import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.page.html',
  styleUrls: ['./income-expense.page.scss'],
})
export class IncomeExpensePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoBack() {
    this.navCtrl.pop();
  }


}
