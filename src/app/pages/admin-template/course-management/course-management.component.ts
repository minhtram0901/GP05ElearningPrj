import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseFormComponent } from './course-form/course-form.component';
import { NotificationService } from 'src/app/_core/shares/notification.service';
import { CourseService } from '../_services/course.service';

export interface KhoaHoc {
  stt: number;
  danhMucKhoaHoc: string;
  maKhoaHoc: string;
  tenKhoaHoc: string;
  ngayTao: string;
  nguoiTao: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: number;
  maDanhMucKhoaHoc: string;
}

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
})
export class CourseManagementComponent implements OnInit {
  danhSachKhoaHoc: KhoaHoc[] = [];
  sortedData: KhoaHoc[] = [];
  listCourse: any;
  subListCourse = new Subscription();
  tenKhoaHoc: any;
  p: number = 1;
  constructor(
    private data: DataService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private service: CourseService
  ) {
    this.sortedData = this.danhSachKhoaHoc.slice();
    this.service.listen().subscribe(() => {
      this.getCourse();
    });
  }

  ngOnInit(): void {
    this.getCourse();
  }
  getCourse() {
    this.subListCourse = this.data
      .get('QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01')
      .subscribe((result: any) => {
        this.listCourse = result;
        this.danhSachKhoaHoc = this.listCourse.map((item: any, index: any) => {
          return {
            stt: index,
            danhMucKhoaHoc: item.danhMucKhoaHoc.tenDanhMucKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
            tenKhoaHoc: item.tenKhoaHoc,
            ngayTao: item.ngayTao,
            nguoiTao: item.nguoiTao.taiKhoan,
            biDanh: item.biDanh,
            moTa: item.moTa,
            luotXem: item.luotXem,
            hinhAnh: item.hinhAnh,
            maDanhMucKhoaHoc: item.danhMucKhoaHoc.maDanhMucKhoahoc,
          };
        });
        this.sortedData = this.danhSachKhoaHoc;
      });
  }

  ngOnDestroy() {
    this.subListCourse.unsubscribe();
  }

  Search() {
    this.p = 1;
    if (this.tenKhoaHoc == '') {
      this.ngOnInit();
    } else {
      this.sortedData = this.danhSachKhoaHoc.filter((item: any) => {
        return removeVietnameseTones(item.tenKhoaHoc)
          .toLocaleLowerCase()
          .includes(removeVietnameseTones(this.tenKhoaHoc).toLocaleLowerCase());
      });
    }
  }

  sortData(sort: Sort) {
    const data = this.danhSachKhoaHoc.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stt':
          return compare(a.stt, b.stt, isAsc);
        case 'danhMucKhoaHoc':
          return compare(a.danhMucKhoaHoc, b.danhMucKhoaHoc, isAsc);
        case 'maKhoaHoc':
          return compare(a.maKhoaHoc, b.maKhoaHoc, isAsc);
        case 'tenKhoaHoc':
          return compare(a.tenKhoaHoc, b.tenKhoaHoc, isAsc);
        case 'biDanh':
          return compare(a.biDanh, b.biDanh, isAsc);
        case 'luotXem':
          return compare(a.luotXem, b.luotXem, isAsc);
        case 'ngayTao':
          return compare(a.ngayTao, b.ngayTao, isAsc);
        case 'nguoiTao':
          return compare(a.nguoiTao, b.nguoiTao, isAsc);
        default:
          return 0;
      }
    });
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CourseFormComponent, dialogConfig);
  }

  onEdit(course: any) {
    this.service.populateForm(course);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CourseFormComponent, dialogConfig);
  }

  deleteCourse(maKhoaHoc: any) {
    this.data
      .delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`, {
        responseType: 'text'
      })
      .subscribe(
        (result) => {
          console.log('result', result);
          this.notificationService.success('X??a kh??a h???c th??nh c??ng');
          this.getCourse();
        },
        (error) => {
          console.log('error', error);
          this.notificationService.warn(error.error);
          this.getCourse();
        }
      );
  }
}

function removeVietnameseTones(str: string) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
  str = str.replace(/??|??|???|???|??/g, 'I');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
  str = str.replace(/???|??|???|???|???/g, 'Y');
  str = str.replace(/??/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
  // Remove extra spaces
  // B??? c??c kho???ng tr???ng li???n nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // B??? d???u c??u, k?? t??? ?????c bi???t
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
