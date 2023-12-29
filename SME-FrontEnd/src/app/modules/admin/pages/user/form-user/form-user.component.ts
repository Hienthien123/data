import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/doan/userModel';
import { ImageService } from 'src/app/services/admin/image.service';
import { UserService } from 'src/app/services/admin/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit{
  breadCrumb = [
    {
      title: 'User',
      path: '/admin/user'
    },
    {
      title: 'Thông tin user',
      path: ''
    }
  ]
  data: UserModel = {
    _id: '',
    username: '',
    profile: {
      name: '',
      avatar: '',
      bio: '',
    },
    roles: [],
    isEnable: false,
    isActive: true,
    createdAt: '',
    updatedAt: '',
    __v: 1,
    email: '',
  }
  img: any = ''
  file: any = null

  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private imageService : ImageService) { }
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
      const getDataPromise = this.userService.getById(id).subscribe(res => {
        if(res.isSuccess){
          this.data = res.result 
          console.log(this.data)
          this.img = res.result.profile.avatar
          if(res.token)
localStorage.setItem('authorization',res.token)
        }
        else
        console.log(res.message )
      })
    }
    
  }

  submit(){
    const changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization')
    }
    const image = {
      authorization: localStorage.getItem('authorization'),
      file : this.file,
    }
    if(this.file){
      const uploadImage =  this.imageService.uploadAvatar(image).subscribe(res=>{
        console.log(res)
        if(res.isSuccess){
          changed.change.profile.avatar = res.secure_url
          if(this.route.snapshot.paramMap.get('_id')){
            const addDataPromise = this.userService.update(changed).subscribe(res => {
              if(res.isSuccess){
                this.router.navigate(['/admin/user'])
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
        const addDataPromise = this.userService.update(changed).subscribe(res => {
          if(res.isSuccess){
            this.router.navigate(['/admin/user'])
          }
        })
      }

      }

    
  }

}
