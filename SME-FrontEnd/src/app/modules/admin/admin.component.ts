import { Component, OnInit } from '@angular/core';
import {AdminMenu} from '../../config/admin-menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menuItems = AdminMenu;
  ngOnInit(): void {
      console.log(this.menuItems);
      
  }
}
