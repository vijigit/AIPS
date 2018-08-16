import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorizationService} from "../authorization.service";
import {NgForm} from "@angular/forms";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthorizationService) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.auth.signIn(email, password).subscribe((data) => {
      this.router.navigate(['users-dashboard']);
    }, (err)=> {
      this.invalidLogin = true;
      Swal("", err.message, "error")
    });  
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
}
