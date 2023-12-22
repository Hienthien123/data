import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/website/data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnDestroy{
  
  constructor(private dataService: DataService){
    

  }
  ngOnDestroy(): void {
    // this.data.unsubscribe();
  }


}

  


