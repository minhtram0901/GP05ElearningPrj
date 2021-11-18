import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
})
export class CourseManagementComponent implements OnInit {
  listCourse: any;
  subListCourse = new Subscription();
  tenKhoaHoc: any;
  p : number = 1;
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

  Search() {
    if (this.tenKhoaHoc == '') {
      this.ngOnInit();
    } else {
      this.listCourse = this.listCourse.filter((item: any) => {
        console.log(item);
        return item.tenKhoaHoc
          .toLocaleLowerCase()
          .match(this.tenKhoaHoc.toLocaleLowerCase());
      });
    }
  }

  key: string = 'id';
  reserse: boolean = false;
  sort (key: any){
    this.key = key;
    this.reserse = !this.reserse;
  }
}
