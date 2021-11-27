import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title: string = "";
  listCourse: any = [];
  error: any;
  infoPagination: any;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((result) => {
      this.title = result.tenDanhMuc;
    });

    this.activatedRoute.params.subscribe((result) => {
      this.dataService.get(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${result.id}&MaNhom=GP01`).subscribe({
        next: (result) => {
          this.error = null;
          this.listCourse = result;
          const tempPagination = {
            currentPage: 1,
            item: 8,
            totalPages: this.numberToArray(Math.ceil(result.length / 8)),
            totalItems: result.length,
            itemStart: 0,
            itemEnd: 8,
          };
          this.infoPagination = { ...tempPagination };
        },
        error: (error) => {
          this.error = error;
        }
      });

    });
  }

  // number to array
  numberToArray(number: number) {
    return Array.from(Array(number).keys());
  }

  // next page
  nextPage(page: any) {

    if (page < this.infoPagination.totalPages.length) {

      const infoTemp = { ...this.infoPagination };
      infoTemp.currentPage = page + 1;
      infoTemp.itemStart = (page) * infoTemp.item;
      infoTemp.itemEnd = (page + 1) * infoTemp.item;
      this.infoPagination = { ...infoTemp };
    }
  }

  // prev page
  prevPage(page: any) {
    if (page > 1) {
      this.infoPagination.currentPage = page - 1;
      this.infoPagination.itemStart = (page - 2) * this.infoPagination.item;
      this.infoPagination.itemEnd = (page - 1) * this.infoPagination.item;
    }
  }

  // go to page
  goToPage(page: any) {
    if (page + 1 === this.infoPagination.currentPage) {
      return;
    }

    if (page + 1 > this.infoPagination.currentPage && page + 1 <= this.infoPagination.totalPages.length) {
      this.nextPage(page);

    } else {
      this.prevPage(page + 2);
    }
  }

}
