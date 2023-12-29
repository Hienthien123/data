import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewModel } from 'src/app/models/doan/reviewModel';
import { ReviewService } from 'src/app/services/admin/review.service';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.scss']
})
export class FormReviewComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Review',
      path: ''
    },
    {
      title: 'Thông tin Review',
      path: ''
    }
  ]
  data: ReviewModel = {
    _id: '',
    user_id: {
      _id: '',
      username: ''
    },
    course_id: '',
    rating: 0,
    review_text: '',
    keyword: [],
    perc_contribution: 0,
    topic_id: {},
    createdAt: '',
    updatedAt: '',
    __v: 0,
  }
  course_id = ''
  constructor(private reviewService: ReviewService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    const x = this.route.snapshot.paramMap.get('_id')
    if (x !== null) {
      const id = {
        _id: x,
        authorization: localStorage.getItem('authorization'),
      }
      const getDataPromise = this.reviewService.getById(id).subscribe(res => {
        if (res.isSuccess) {
          this.data = res.result
          console.log(this.data)
          if (res.token)
            localStorage.setItem('authorization', res.token)
        }
      })
    }
    const xx = this.route.snapshot.paramMap.get('course_id')
    if (xx !== null)
      this.course_id = xx
    this.breadCrumb[0].path = '/admin/review/' + xx
  }

  submit() {
    var changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization')
    }
    console.log(changed)
    const xx = this.route.snapshot.paramMap.get('course_id')
    if (xx !== null) {
      changed.change.course_id = xx
      if (this.route.snapshot.paramMap.get('_id')) {
        const addDataPromise = this.reviewService.update(changed).subscribe(res => {
          if (res.isSuccess) {
            this.router.navigate(['/admin/review', xx])
          }
        })

      } else {

        const addDataPromise = this.reviewService.create(changed).subscribe(res => {
          if (res.isSuccess) {
            this.router.navigate(['/admin/review', xx])
          }
        })
      }
    }
  }
}