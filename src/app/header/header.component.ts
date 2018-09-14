import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../sharedServices/authorization.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string ="";

  constructor(private auth: AuthorizationService,  private _router: Router) {
    if(!this.auth.isLoggedIn()){
      this._router.navigateByUrl("");
  } else {
    this.userName = this.auth.getAuthenticatedUser().getUsername().toString();
    }
   }

  ngOnInit() {
  }

  doLogout(){    
    this.auth.logOut();
    this._router.navigateByUrl('');
  }

  
}
