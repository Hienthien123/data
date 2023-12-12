import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestModel } from 'src/app/models/test.model';
import { TestServiceService } from 'src/app/services/admin/test-service.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  imageFile: File | null = null;
  imageURL: string | null = null;

  data: TestModel = {id: 0, title: '',email:'',selected:false, image: new File([], ''),img:'' };

  itemId: string | null |undefined;
  
  constructor(private route: ActivatedRoute, private testService: TestServiceService, private router: Router){

  }
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId)); 
  }

  loadData(id: number){
    const getDataPromise = this.testService.getById(id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result as TestModel;
      }
    })
  }
  onImageChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageFile = files[0];
      this.imageURL = URL.createObjectURL(this.imageFile as Blob);
    }
    else { 
    var newImageURL = "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg";
      this.imageFile = null;
      this.imageURL = newImageURL;
    }
  }
 

  
  submit() {
    if (this.imageFile) {
      this.data.image = this.imageFile;
    }   
    if (this.itemId ) {
      const addDataPromise = this.testService.update(this.data).subscribe(res => {
        if (res.isSuccess) {
          this.router.navigate(['/admin/test']);
        }
      });
    } else {
      
        const addDataPromise = this.testService.create(this.data).subscribe(res => {
          if (res.isSuccess) {
            this.router.navigate(['/admin/test']);
          }
        });
      }
    }
  }

