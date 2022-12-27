import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  courses: any[] = [
    {
      title: "Course 1",
      desc: "Course 1 desc",
      courseId: "1"
    },
    {
      title: "Course 2",
      desc: "Course 2 desc",
      courseId: "2"
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openCourse(course: any) {
    console.log('course: ', course);
    this.router.navigate(['course-details'], { queryParams: { course: JSON.stringify(course) } });
  }


}
