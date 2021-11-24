import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../_services/course.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/_core/services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_core/shares/notification.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  danhMucDaChon: any;
  listDanhMuc: any;
  subDanhMucKhoaHoc = new Subscription();
  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<CourseFormComponent>,
    public courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getDanhMucKhoaHoc();
  }

  getDanhMucKhoaHoc() {
    this.subDanhMucKhoaHoc = this.data
      .get('QuanLyKhoaHoc/LayDanhMucKhoaHoc')
      .subscribe((result: any) => {
        this.listDanhMuc = result;
        // this.danhMucDaChon = this.listDanhMuc[0].maDanhMuc;
      });
  }

  ngOnDestroy() {
    this.subDanhMucKhoaHoc.unsubscribe();
  }

  onClear() {
    this.courseService.courseForm.reset();
    this.courseService.initializeFormGroup();
  }
  onClose() {
    this.courseService.courseForm.reset();
    this.courseService.initializeFormGroup();
    this.dialogRef.close();
    this.courseService.filter('Close form');
  }

  onSubmit() {
    if (this.courseService.courseForm.valid) {
      if (this.courseService.courseForm.get('$key')?.value === null)
        this.addCourse(this.courseService.courseForm.value);
      else {
        this.editCourse(this.courseService.courseForm.value);
      }
    }
  }

  addCourse(course: any) {
    console.log('course', course);
    course.maNhom = 'GP01';
    this.data.post(`QuanLyKhoaHoc/ThemKhoaHoc`, course).subscribe(
      () => {
        this.courseService.courseForm.reset();
        this.courseService.initializeFormGroup();
        this.notificationService.success('Thêm khóa học thành công');
        this.onClose();
      },
      (error) => {
        this.notificationService.warn(error.error);
        console.log(error, error.error);
      }
    );
  }

  editCourse(course: any) {
    course.maNhom = 'GP01';
    this.data.put(`QuanLyKhoaHoc/CapNhatKhoaHoc`, course).subscribe(
      () => {
        this.courseService.courseForm.reset();
        this.courseService.initializeFormGroup();
        this.notificationService.success('Cập nhật thành công');
        this.onClose();
      },
      (error) => {
        this.notificationService.warn(error.error);
      }
    );
  }
}
