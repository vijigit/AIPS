import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   currentURL : string;
  constructor(private router : Router) {
      router.events.subscribe((_:NavigationEnd) => this.currentURL = _.url)

   }

  ngOnInit() {
  }

}
