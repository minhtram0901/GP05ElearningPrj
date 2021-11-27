import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/_core/services/share.service';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss']
})
export class ModalReviewComponent implements OnInit {

  @ViewChild("close") close: any;

  course: any;

  constructor(private shareService: ShareService, private router: Router) { }

  ngOnInit(): void {

    this.shareService.courseReview.subscribe((result: any) => {
      this.course = result;
    });
  }


  goDetail() {
    this.close.nativeElement.click();
    this.router.navigate([`/detail/${this.course.maKhoaHoc}`],);
  }
}
