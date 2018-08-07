import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthorizationService,  private _router: Router) { }

  ngOnInit() {
  }

  doLogout(){    
    this.auth.logOut();
    this._router.navigateByUrl('');
  }
}
