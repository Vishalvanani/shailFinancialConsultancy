import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoBack() {
    this.navCtrl.pop();
  }


}
