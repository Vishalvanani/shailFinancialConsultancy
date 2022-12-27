import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  
  courseData: any;
  constructor(private route: ActivatedRoute) {
    let course: any = this.route.snapshot.queryParamMap.get('course');
    console.log('course: ', course);
    this.courseData = typeof course === 'object' ? course : JSON.parse(course);
  }

  ngOnInit() {
  }

}
