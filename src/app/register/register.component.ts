import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{ 
  signupForm: FormGroup;
  codeform: FormGroup;
  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  registration: boolean = true;
  error: string = "";
  
  constructor(private auth: AuthorizationService,
              private _router: Router, private formBuilder: FormBuilder) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const userName = form.value.userName;
    this.auth.register(userName, email, password).subscribe(
      (data) => {        
        this.confirmCode = true;
        this.registration = false;
      },
      (err) => {
        //console.log(err.message);
        Swal("" , err.message, "error")
        this.error = "Registration Error has occurred";
        //swal('Password Policy Error: Min Length 6, Must include capital, Small case,Special character and number.');
      }
    );
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;
    
    this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        //this._router.navigateByUrl('/');
        console.log("Code Was Confirmed");
        
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },
      (err) => {
        Swal("" , err.message, "error")
        this.error = "Confirm Authorization Error has occurred";
      });
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName: ['', Validators.required]
    });
    this.codeform = this.formBuilder.group({
      code: ['', Validators.required]
    })
  }
}