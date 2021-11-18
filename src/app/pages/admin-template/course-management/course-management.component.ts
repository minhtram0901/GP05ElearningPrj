import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
})
export class CourseManagementComponent implements OnInit {
  listCourse: any;
  subListCourse = new Subscription();
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getCourse();
  }
  getCourse() {
    this.subListCourse = this.data
      .get('QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01')
      .subscribe((result: any) => {
        console.log(result);
        this.listCourse = result;
      });
  }

  ngOnDestroy() {
    this.subListCourse.unsubscribe();
  }
}
