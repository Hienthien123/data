import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ELocationType } from 'src/app/models/enums/location-select.enum';
import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/admin/location.service';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss']
})
export class LocationSelectComponent implements OnInit, OnChanges{
  @Input() objectName: string = '';
  @Input() classList: string = '';
  @Input() elementName: string = '';
  @Input() type: ELocationType = 0;
  @Input() parentId: number = 0;
  @Input() selectedValue: number = 0;
  @Output() changeValue = new EventEmitter<any>();

  options: LocationModel[] = [];

  constructor(private locationService: LocationService){}

  ngOnInit(): void {
      this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {            
      this.loadData();          
  }

  loadData(){
    if(this.type == ELocationType.Province){
        console.log('province: ', this.selectedValue);
        const provinceSub = this.locationService.getProvinces().subscribe(res => {
          if(res.isSuccess){
            this.options = res.result as LocationModel[];            
          }
        })
        
      }
      else{
        if(this.type == ELocationType.District && this.parentId != 0){
          console.log('district: ', this.selectedValue);
          const districtSub = this.locationService.getDistrict(this.parentId).subscribe(res => {
            if(res.isSuccess){
              this.options = res.result as LocationModel[];              
            }
          })
        }
        else if(this.type == ELocationType.Ward && this.parentId != 0){
          console.log('ward: ', this.selectedValue);
          const wardSub = this.locationService.getWards(this.parentId).subscribe(res => {
            if(res.isSuccess){
              this.options = res.result as LocationModel[];              
            }
          })
        }
        else if(this.parentId == 0) this.options = [];
      }   
  }

  onSelectChange(event: any) {        
    this.selectedValue = event.value;
    this.changeValue.emit({type: this.type, value: this.selectedValue, objectName: this.objectName});
  }
}