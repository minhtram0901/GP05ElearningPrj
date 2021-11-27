import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    luotXem: new FormControl('', Validators.min(0)),
    danhGia: new FormControl('', [Validators.min(0), Validators.max(5)]),
    hinhAnh: new FormControl(''),
    maNhom: new FormControl('GP01'),
    ngayTao: new FormControl(''),
    maDanhMucKhoaHoc: new FormControl('', Validators.required),
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
      ngayTao: '',
      maDanhMucKhoaHoc: '',
      nguoiTao: '',
    });
  }
}
