import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/_core/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class DanhMucService {
  listDanhMuc: any;
  subDanhMucKhoaHoc = new Subscription();
  constructor(private data: DataService) {
    this.subDanhMucKhoaHoc = this.data
      .get('QuanLyKhoaHoc/LayDanhMucKhoaHoc')
      .subscribe((result: any) => {
        this.listDanhMuc = result;
      });
  }
}
