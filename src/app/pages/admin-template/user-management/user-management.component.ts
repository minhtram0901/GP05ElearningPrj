import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';

export interface NguoiDung {
  stt: number;
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  danhSachNguoiDung: NguoiDung[] = [];
  sortedData: NguoiDung[] = [];
  listUser: any;
  subListUser = new Subscription();
  tenNguoiDung: any;
  p: number = 1;
  constructor(private data: DataService) {
    this.sortedData = this.danhSachNguoiDung.slice();
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.subListUser = this.data
      .get('QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01')
      .subscribe((result: any) => {
        this.listUser = result;
        this.danhSachNguoiDung = this.listUser.map((item: any, index: any) => {
          return {
            stt: index,
            taiKhoan: item.taiKhoan,
            hoTen: item.hoTen,
            email: item.email,
            soDt: item.soDt,
            maLoaiNguoiDung: item.maLoaiNguoiDung,
          };
        });
        this.sortedData = this.danhSachNguoiDung;
      });
  }

  ngOnDestroy() {
    this.subListUser.unsubscribe();
  }

  Search() {
    this.p = 1;
    if (this.tenNguoiDung == '') {
      this.ngOnInit();
    } else {
      this.sortedData = this.danhSachNguoiDung.filter((item: any) => {
        return removeVietnameseTones(item.hoTen)
          .toLocaleLowerCase()
          .includes(
            removeVietnameseTones(this.tenNguoiDung).toLocaleLowerCase()
          );
      });
    }
  }

  sortData(sort: Sort) {
    const data = this.danhSachNguoiDung.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stt':
          return compare(a.stt, b.stt, isAsc);
        case 'taiKhoan':
          return compare(a.taiKhoan, b.taiKhoan, isAsc);
        case 'hoTen':
          return compare(a.hoTen, b.hoTen, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'soDt':
          return compare(a.soDt, b.soDt, isAsc);
        case 'maLoaiNguoiDung':
          return compare(a.maLoaiNguoiDung, b.maLoaiNguoiDung, isAsc);
        default:
          return 0;
      }
    });
  }
}

function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
