import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestModel } from 'src/app/models/test.model';
import { TestServiceService } from 'src/app/services/admin/test-service.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  selectedFile: File | null = null;
  testData: TestModel[] = [];
  showTitleModal = false;
  showModal = false;
  selectedTitles: string[] = [];
  searchTerm: string='';
  currentSortOrder = 'asc';
  body : string='';
  testId: number=0 ;
  imageURL: string | null = null;
  // paginationSet: PaginationSetModel<TestModel> = {
  //   page: 0,
  //   totalCount: 0,
  //   totalPage: 0,
  //   items: []
  // };

  currentPage = 1;
  pageSize = 4;
  constructor(private route: ActivatedRoute,private testService: TestServiceService,private router: Router, private toastr: ToastrService) {        

  }
  ngOnInit(): void {
      this.loadData()
  }
  exportexcel(){
    this.testService.exportexcel().subscribe(data => {
      this.toastr.info('Export thành công');
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Customers.xlsx';
      link.click();
    });
    
  }
  generatePDF() {
    if (!this.testId) {
      alert('Please enter an order ID.');
      return;
    }
    this.testService.generatePDF(this.testId).subscribe(data => {
      this.toastr.info('Generate thành công');
    const blob = new Blob([data], { type: 'application/pdf' });
    // Create a link element to download the PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Order_${this.testId}.pdf`;
    link.click();
  });
  // loadTestData() {
  //   this.testService.PhanTrang(this.currentPage, this.pageSize)
  //     .subscribe(paginationSet => {
  //       this.paginationSet = paginationSet;
  //     });
  // }
   }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  search() {
    if (this.searchTerm) {
      const getAllPromise = this.testService.search(this.searchTerm).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Tải dữ liệu thành công');
          this.testData = res.result as TestModel[];
        }else{
          this.toastr.error(res.message);
        }  
      })
    }
  }
  
  toggleSortOrder() {
    this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    this.sortData(this.currentSortOrder);
  }

  sortData(order: string) {
    let sortFunction;
    if (order === 'asc') {
      sortFunction = this.testService.sortbyasc();
    } else if (order === 'desc') {
      sortFunction = this.testService.sortbydesc();
    }

    if (sortFunction) {
      const sortPromise = sortFunction.subscribe(res => {
        if (res.isSuccess) {
          this.toastr.info('Tải dữ liệu thành công');
          this.testData = res.result as TestModel[];
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
  // sortbyasc(){
  //   const getAllPromise = this.testService.sortbyasc().subscribe(res => {
  //     if(res.isSuccess){
  //       this.toastr.info('Tải dữ liệu thành công');
  //       this.testData = res.result as TestModel[];
  //     }else{
  //       this.toastr.error(res.message);
  //     }
  //   })
  // }
  // sortbydesc(){
  //   const getAllPromise = this.testService.sortbydesc().subscribe(res => {
  //     if(res.isSuccess){
  //       this.toastr.info('Tải dữ liệu thành công');
  //       this.testData = res.result as TestModel[];
  //     }else{
  //       this.toastr.error(res.message);
  //     }
  //   })
  // }
  loadData(){
    const getAllPromise = this.testService.getAll().subscribe(res => {
      if(res.isSuccess){
        this.toastr.info('Tải dữ liệu thành công');
        this.testData = res.result as TestModel[];
        
      }else{
        this.toastr.error(res.message);
      }
    })
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }
  importExcel() {
    if (this.selectedFile) {
      this.testService.importExcel(this.selectedFile).subscribe(
        (response) => {
          if (response.isSuccess) {
            this.router.navigate(['/admin/test'])
            this.toastr.info('Import Dữ liệu thành công');
            this.loadData();
            console.log('Import successful:', response.result);
          } else {
            console.error('Import failed:', response.message);
          }
        },
        error => {
          console.error('Error importing Excel:', error);
        }
      );
    }
  }
    // toggleAllCheckboxes() {
    //   const isChecked = this.testData.every(item => item.selected);
    //   this.testData.forEach(item => (item.selected = !isChecked));
      
    // }
   
    sendEmail(){

        const sendmail = this.testService.SendEmail(this.body).subscribe(res => {
          if(res.isSuccess){
           this.closeModal();
            this.toastr.info('Gửi thành công');
          
          }else{
            this.toastr.error(res.message);
          }
        })
      }
      
      toggleModal() {
        this.showModal = !this.showModal;
      }
      closeModal() {
        this.showModal = false ;
      }
      closeModaltable() {
        this.testData.forEach(item => (item.selected = false)); // Bỏ chọn tất cả các mục
        this.selectedTitles = []; // Xóa danh sách tiêu đề được chọn
        this.showTitleModal = false; // Ẩn modal
      }
      
      
      toggleCheckbox(item: any) {
        item.selected = !item.selected;
      
        
        this.selectedTitles = this.testData
          .filter(selectedItem => selectedItem.selected)
          .map(selectedItem => selectedItem.title);
      }
      
      toggleAllCheckboxes() {
        const isChecked = this.testData.every(item => item.selected);
      
        this.testData.forEach(item => (item.selected = !isChecked));
        this.selectedTitles = this.testData
          .filter(selectedItem => selectedItem.selected)
          .map(selectedItem => selectedItem.title);
      
       
        this.showTitleModal = !this.showTitleModal;
      }
      
   
  deleteItem(item: TestModel){
    if(confirm(`Xác nhận xóa ${item.title}`)){
      const deletePromise = this.testService.delete(item.id).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }
}
