import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthorizationService} from "../authorization.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   currentURL : string;
   dashboardForm : FormGroup;
   technologies: any[];

  constructor(private router : Router, private auth: AuthorizationService, private formBuilder: FormBuilder) {
      router.events.subscribe((_:NavigationEnd) => this.currentURL = _.url);
      this.technologies=["JAVA"];

   }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
        this.router.navigateByUrl("");
    }
    this.dashboardForm = this.formBuilder.group({
      candidateEmail: ['', Validators.required],
      candidateName: ['', Validators.required]
    });
  }

}
