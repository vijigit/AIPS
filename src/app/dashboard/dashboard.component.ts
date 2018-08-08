import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../header/header.component';
import {AuthorizationService} from "../authorization.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   currentURL : string;
  constructor(private router : Router, private auth: AuthorizationService) {
      router.events.subscribe((_:NavigationEnd) => this.currentURL = _.url)

   }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
        this.router.navigateByUrl("");
    }
  }

}
