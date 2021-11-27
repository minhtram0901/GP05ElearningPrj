import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {


  course: any;
  listCourse: any;
  error: any;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (data) => {

        this.dataService.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${data.id}`).subscribe({
          next: (data) => {

            this.course = data;
            this.getLisCourse(data.danhMucKhoaHoc.maDanhMucKhoahoc);
          },
          error: (error) => {
            this.error = error;
          }
        });
      },
      error: (error) => {
        this.error = error;

      }
    });
  }


  getLisCourse(category: any) {

    this.dataService.get(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${category}&MaNhom=GP01`).subscribe({
      next: (result) => {

        this.listCourse = this.shuffle(result.filter((course: any) => course.maKhoaHoc !== this.course.maKhoaHoc));
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

  shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
