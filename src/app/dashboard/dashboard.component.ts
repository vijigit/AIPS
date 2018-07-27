import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


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
