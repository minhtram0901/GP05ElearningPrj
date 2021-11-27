import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {
  listCourse: any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01").subscribe((result) => {
      this.listCourse = result;
    });
  }

}
