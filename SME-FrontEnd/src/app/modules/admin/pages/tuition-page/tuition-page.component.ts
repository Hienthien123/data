import { Component, OnInit } from '@angular/core';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { TuitionModel } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/admin/tuition.service';

@Component({
  selector: 'app-tuition-page',
  templateUrl: './tuition-page.component.html',
  styleUrls: ['./tuition-page.component.scss']
})
export class TuitionPageComponent implements OnInit{
  tuitionData: TuitionModel[] = [];

  constructor(private tuitionService: TuitionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const getAllPromise = this.tuitionService.getAll()
    .subscribe(res => {
      if (res.isSuccess) {
        this.tuitionData = res.result as TuitionModel[];
        console.log(this.tuitionData);
      }
      else {
        console.log(res.message);
      }

    })
  }
  
  deleteItem(item: TuitionModel) {
    if (confirm(`Xác nhận xóa ${item.title}`)) {
      const deletePromise = this.tuitionService.delete(item.id)
            .subscribe(res => {
              if (res.isSuccess) {
                this.loadData();
              }else {
                console.log(res.message);
              }
            });
    }
  }
}
