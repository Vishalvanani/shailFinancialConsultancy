import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/provider/http.service';

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

  constructor(private router: Router, private httpService: HttpService) { }

  async ngOnInit() {
    await this.getCoruseList();
  }

  openCourse(course: any) {
    console.log('course: ', course);
    this.router.navigate(['course-details'], { queryParams: { course: JSON.stringify(course) } });
  }

  getCoruseList() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_course_master.php").subscribe(res => {
        console.log('res: ', res);
        this.courses = res;
        resolve('');
      }, (err) => {
        this.courses = [];
        reject(err)
      })
    })
  }


}
