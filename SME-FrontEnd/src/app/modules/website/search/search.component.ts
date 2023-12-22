import { Component,Input } from '@angular/core';
import { DataService } from 'src/app/services/website/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private dataService: DataService){}
  value : any = ''
  onEnterPressed():void{
    if(!this.value||this.value==='')
      return
    // console.log(this.value)
    this.dataService.updateData(this.value)
  }
}
  