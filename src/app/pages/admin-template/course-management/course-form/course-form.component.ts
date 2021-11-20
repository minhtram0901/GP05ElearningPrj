import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../_services/course.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/_core/services/data.service';
import { FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  danhMucDaChon: any;
  listDanhMuc: any;
  subDanhMucKhoaHoc = new Subscription();
  constructor(private data: DataService, public courseService: CourseService) { }

  ngOnInit(): void {
    this.getDanhMucKhoaHoc();
  }

  getDanhMucKhoaHoc() {
    this.subDanhMucKhoaHoc = this.data
      .get('QuanLyKhoaHoc/LayDanhMucKhoaHoc')
      .subscribe((result: any) => {
        this.listDanhMuc = result;
        console.log(result);
      });
  }
  onClear() {
    this.courseService.courseForm.reset();
    // for (let control in this.courseService.courseForm.controls) {
    //   this.courseService.courseForm.controls[control].setErrors(null);
    // }
  }
}
