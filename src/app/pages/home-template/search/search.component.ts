import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  listCourse: any;
  valueSearch: any;
  error: any;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (result) => {
        this.error = null;
        this.valueSearch = result.valueSearch;
        this.getListCourse(result.valueSearch);
      },
      error: (error) => {
        this.listCourse = null;
        this.error = error.error;
      }
    });
  }

  getListCourse(valueSearch: any) {
    this.dataService.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${valueSearch}&MaNhom=GP01`).subscribe({
      next: (result) => {
        this.listCourse = result;
      },
      error: () => {
        this.listCourse = null;
      }
    });
  }


}
