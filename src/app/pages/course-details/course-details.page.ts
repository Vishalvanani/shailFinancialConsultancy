import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CourseInquiryPage } from 'src/app/pages/course-inquiry/course-inquiry.page';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  
  courseData: any;
  constructor(private route: ActivatedRoute, private modalCtrl: ModalController) {
    let course: any = this.route.snapshot.queryParamMap.get('course');
    console.log('course: ', course);
    this.courseData = typeof course === 'object' ? course : JSON.parse(course);
  }

  ngOnInit() {
  }
  

  async createCounrseInquiry() {
    const modal = await this.modalCtrl.create({
      component: CourseInquiryPage
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        console.log('modelData: ', modelData);
      }
    });
    return await modal.present();
  }
}
