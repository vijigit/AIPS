import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from 'sweetalert'
// https://github.com/aws/amazon-cognito-identity-js
// https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html

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
    this.auth.register(email, password).subscribe(
      (data) => {        
        this.confirmCode = true;
        this.registration = false;
      },
      (err) => {
        //console.log(err);
        this.error = "Registration Error has occurred";
        swal('Password Policy Error: Min Length 6, Must include capital, Small case,Special character and number.');
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
        console.log(err);
        this.error = "Confirm Authorization Error has occurred";
      });
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.codeform = this.formBuilder.group({
      code: ['', Validators.required]
    })
  }
}