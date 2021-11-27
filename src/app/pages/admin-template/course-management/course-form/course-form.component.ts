import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../_services/course.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/_core/services/data.service';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_core/shares/notification.service';
import { DanhMucService } from '../../_services/danh-muc.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  disableMaKhoaHoc: boolean = false;
  danhMucDaChon: any;
  listDanhMuc: any;
  subDanhMucKhoaHoc = new Subscription();
  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<CourseFormComponent>,
    public courseService: CourseService,
    private notificationService: NotificationService,
    public danhMuc: DanhMucService
  ) {
    if (this.courseService.courseForm.get('$key')?.value === null) {
      this.disableMaKhoaHoc = false;
    } else{
      this.disableMaKhoaHoc = true;
    }
   }

  ngOnInit(): void {
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
      let obj = {
        maKhoaHoc: this.courseService.courseForm.value.maKhoaHoc,
        biDanh: this.courseService.courseForm.value.biDanh,
        tenKhoaHoc: this.courseService.courseForm.value.tenKhoaHoc,
        moTa: this.courseService.courseForm.value.moTa,
        luotXem: this.courseService.courseForm.value.luotXem,
        danhGia: this.courseService.courseForm.value.danhGia,
        hinhAnh: this.courseService.courseForm.value.hinhAnh,
        maNhom: 'GP01',
        ngayTao: this.courseService.courseForm.value.ngayTao,
        maDanhMucKhoaHoc: this.courseService.courseForm.value.maDanhMucKhoaHoc,
        taiKhoanNguoiTao: this.courseService.courseForm.value.nguoiTao,
      };
      
      if (this.courseService.courseForm.get('$key')?.value === null) {
        this.addCourse(obj);
      } else {
        this.editCourse(obj);
      }
    }
  }

  addCourse(course: any) {
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
