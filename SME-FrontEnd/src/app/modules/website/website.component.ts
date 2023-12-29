import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { website } from 'src/app/config/admin-menu';
import { TestScoreService } from 'src/app/services/admin/test-score.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  menuItems = website;
  searchText = ''
  ngOnInit(): void {
    console.log(this.menuItems);
  }
}
