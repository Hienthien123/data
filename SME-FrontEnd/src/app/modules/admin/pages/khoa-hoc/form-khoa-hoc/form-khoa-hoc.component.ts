import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/models/doan/courseModel';
import { ImageService } from 'src/app/services/admin/image.service';
import { KhoaHocService } from 'src/app/services/admin/khoa-hoc.service';

@Component({
  selector: 'app-form-khoa-hoc',
  templateUrl: './form-khoa-hoc.component.html',
  styleUrls: ['./form-khoa-hoc.component.scss']
})
export class FormKhoaHocComponent implements OnInit{
  breadCrumb = [
    {
      title: 'Khóa học',
      path: '/admin/khoa-hoc'
    },
    {
      title: 'Thông tin khóa học',
      path: ''
    }
  ]
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  
  
  data: any = {
    _id: String,
    title: '',
    description: '',
    price: 0,
    categories: [],
    tags: [],
    image: 'tai',
    chapters: [],
    reviews: [],
    payments: [],
    isDelete: false,
    author_id: '',
    createdAt: '',
    updatedAt: '',
    __v: 1,
  }
  img: any = ''
  file: any = null

  constructor(private KhoaHocService_: KhoaHocService,private route: ActivatedRoute,private router: Router,private imageService : ImageService) { }
  ngOnInit(): void {
    this.loadData()

  }
  onFilechange(event: any) {
    this.file = event.target.files[0]
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    this.img = fileUrl
  }
  
  loadData(){
    const x = this.route.snapshot.paramMap.get('_id');
    if(x!=null){
      const id = {
        _id : x,
        authorization : localStorage.getItem('authorization'),
      }
      const getDataPromise = this.KhoaHocService_.getById(id).subscribe(res => {
        if(res.isSuccess){
          this.data = res.result 
          this.img = res.result.image
          if(res.token)
          localStorage.setItem('authorization',res.token)
        }
      })
    }
    
  }

  submit(){
    const changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization'),
    }
    console.log(changed.change.categories)
    let s:string =''
    if(Array.isArray(changed.change.categories))
      s = changed.change.categories.join(',')
    else
      s = changed.change.categories
    changed.change.categories = s.split(',').map(item => item.trim())

    s = ''
    if(Array.isArray(changed.change.tags))
      s = changed.change.tags.join(',')
    else
      s = changed.change.tags
    changed.change.tags = s.split(',').map(item => item.trim())

    const image = {
      authorization: localStorage.getItem('authorization'),
      file : this.file,
    }
    if(this.file){
      const uploadImage =  this.imageService.uploadAvatar(image).subscribe(res=>{
        console.log(res)
        if(res.isSuccess){
          changed.change.image = res.secure_url
          if(this.route.snapshot.paramMap.get('_id')){
            console.log("there")
            const addDataPromise = this.KhoaHocService_.update(changed).subscribe(res => {
              console.log(res)
              if(res.isSuccess){
                this.router.navigate(['/admin/khoa-hoc'])
              }
            })
          }else{
            const addDataPromise = this.KhoaHocService_.create(changed).subscribe(res => {
              console.log(addDataPromise);
              if(res.isSuccess){
                this.router.navigate(['/admin/khoa-hoc'])
              }
            })
          }
        }
        else {
          return
        }
      })
    }else{
      if(this.route.snapshot.paramMap.get('_id')){
        const addDataPromise = this.KhoaHocService_.update(changed).subscribe(res => {
          if(res.isSuccess){
            this.router.navigate(['/admin/khoa-hoc'])
          }
        })
      }else{
        const addDataPromise = this.KhoaHocService_.create(changed).subscribe(res => {
          console.log(addDataPromise);
          if(res.isSuccess){
            this.router.navigate(['/admin/khoa-hoc'])
          }
        })
      }

      }

    
  }

}
