import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}

  courseForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    maKhoaHoc: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    biDanh: new FormControl('', Validators.minLength(3)),
    tenKhoaHoc: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    moTa: new FormControl(''),
    luotXem: new FormControl('', [Validators.min(0), Validators.required]),
    danhGia: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    hinhAnh: new FormControl(''),
    maNhom: new FormControl('GP01'),
    ngayTao: new FormControl(''),
    maDanhMucKhoaHoc: new FormControl('BackEnd', Validators.required),
    nguoiTao: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  initializeFormGroup() {
    this.courseForm.setValue({
      $key: null,
      maKhoaHoc: '',
      biDanh: '',
      tenKhoaHoc: '',
      moTa: '',
      luotXem: '',
      danhGia: '',
      hinhAnh: '',
      maNhom: 'GP01',
      ngayTao: new Date(),
      maDanhMucKhoaHoc: "BackEnd",
      nguoiTao: '',
    });
  }

  populateForm(course: any) {
    this.courseForm.setValue({
      $key: 'edit',
      maKhoaHoc: course.maKhoaHoc ? course.maKhoaHoc : '',
      biDanh: course.biDanh ? course.biDanh : '',
      tenKhoaHoc: course.tenKhoaHoc ? course.tenKhoaHoc : '',
      moTa: course.moTa ? course.moTa : '',
      luotXem: course.luotXem ? course.luotXem : '',
      maNhom: 'GP01',
      danhGia: course.danhGia ? course.danhGia : '',
      hinhAnh: course.hinhAnh ? course.hinhAnh : '',
      ngayTao:  course.ngayTao === "" ? "" : this.convertToDate(course.ngayTao),
      maDanhMucKhoaHoc: course.maDanhMucKhoaHoc ? course.maDanhMucKhoaHoc : '',
      nguoiTao: course.nguoiTao ? course.nguoiTao : '',
    });
  }

  convertToDate(dateString: string) {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;     
}

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
