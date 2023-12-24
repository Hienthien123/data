import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/website/data.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss']
})
export class GridviewComponent implements OnDestroy, OnInit {
  data: any[] = []
  p: any = 1
  uniqueCategoriesList: string[] = []
  tags: string[] = []
  check_tag: boolean[] = []
  check_category: boolean[] = []
  filteredData: any[] = []
  test = true
  min: any = Infinity
  max: any = -Infinity
  min_change: any = 0
  max_change: any = 0

  private dataSubscription: Subscription;
  constructor(private dataService: DataService) {
    this.dataService.initializeData()
    this.dataSubscription = this.dataService.dataCourse$.subscribe((newData) => {
      this.data = newData
      this.filteredData = this.data.slice();
      const allCategoriesSet = new Set<string>();
      this.data.forEach((item: any) => {
        if (item.categories && Array.isArray(item.categories)) {
          item.categories.forEach((category: string) => {
            allCategoriesSet.add(category);
          });
        }
      })
      this.uniqueCategoriesList = Array.from(allCategoriesSet)
      this.check_category = Array.from({ length: this.uniqueCategoriesList.length }, () => true)
      const alltags = new Set<string>();
      this.data.forEach((item: any) => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach((tag: string) => {
            alltags.add(tag);
          });
        }
      })
      this.tags = Array.from(alltags)
      this.check_tag = Array.from({ length: this.tags.length }, () => true)


      this.min = Math.min(...this.filteredData.map(item => item.price))
      this.max = Math.max(...this.filteredData.map(item => item.price))

      this.min_change = this.min
      this.max_change = this.max
    })
  }
  ngOnInit(): void {
  }
  click(): void {
    this.filteredData.pop()
  }
  click2(): void {
    this.filteredData = this.data.slice();
  }

  change(): void {
    this.filteredData = this.data.slice();
    let category_filter = this.uniqueCategoriesList.filter((value, index) => this.check_category[index])
    let tag_filter = this.tags.filter((value, index) => this.check_tag[index])

    this.filteredData = this.filteredData.filter(item => item.categories.some((category: string) => category_filter.includes(category)))

    this.filteredData = this.filteredData.filter(item => item.tags.some((tag: string) => tag_filter.includes(tag)))

    if (this.filteredData.length === 0) {
      this.min = 0
      this.max = 0
      return
    }
    this.min = Math.min(...this.filteredData.map(item => item.price))
    this.max = Math.max(...this.filteredData.map(item => item.price))
    if (this.min_change < this.min)
      this.min_change = this.min
    if (this.min_change > this.max)
      this.min_change = this.max
    if (this.max_change < this.min)
      this.max_change = this.min
    if (this.max_change > this.max)
      this.max_change = this.max

    this.filteredData = this.filteredData.filter(item => item.price>=this.min_change&&item.price<=this.max_change)

  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
