import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from '../_services/user.service';
import { NotificationService } from 'src/app/_core/shares/notification.service';

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
  subTimKiemNguoiDung = new Subscription();
  listTimKiemNguoiDung: any;
  tenNguoiDung: any;
  p: number = 1;
  constructor(
    private data: DataService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private service: UserService
  ) {
    this.sortedData = this.danhSachNguoiDung.slice();
    this.service.listen().subscribe(() => {
      this.getUsers();
    })
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

  deleteUser(taiKhoan: any) {
    this.data
      .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,{
        responseType: 'text'
      })
      .subscribe(
        () => {
          this.notificationService.success('X??a ng?????i d??ng th??nh c??ng');
          this.getUsers();
        },
        (error) => {
          this.notificationService.warn(error.error);
          this.getUsers();
        }
      );
  }

  ngOnDestroy() {
    this.subListUser.unsubscribe();
    this.subTimKiemNguoiDung.unsubscribe();
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

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  onEdit(user: any) {
    let findUser: any;
    let keyword = getKeywordSearch(user.hoTen);
    this.subTimKiemNguoiDung = this.data
      .get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`)
      .subscribe(
        (result: any) => {
          this.listTimKiemNguoiDung = result;
          findUser = this.listTimKiemNguoiDung.find((item: any) => {
            return item.taiKhoan === user.taiKhoan;
          });

          this.service.populateForm(user, findUser.matKhau);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          this.dialog.open(UserFormComponent, dialogConfig);

        },
        (error) => {
          this.notificationService.warn(error.error);
        }
      );
  }
}

function getKeywordSearch(hoTen: string) {
  let keyword = removeVietnameseTones(hoTen);
  const keywordArr = keyword.split(' ');
  keyword = keywordArr[0];
  return keyword;
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
