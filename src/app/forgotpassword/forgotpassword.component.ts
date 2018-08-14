import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationService } from "../authorization.service";
import { AnalyticsConfigurationList } from '../../../node_modules/aws-sdk/clients/s3';
import { CognitoUser } from 'amazon-cognito-identity-js';
declare var $: any;
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  verifyCodeForm: FormGroup;
  invalidLogin: boolean = false;
  error: string = "";  
  verifyCodeStatus: boolean = false;
  singleClick: boolean = false;
  verifyClick: boolean = false;
  userEmail: string = "";
  forgotPwd: boolean = true;
  dataForm: Object;
  passwordChanged: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthorizationService) { }

  OnSubmit(form: NgForm) {
    this.userEmail = form.value.email;

    this.auth.resetPassword(this.userEmail).subscribe(
      (data) => {
        this.dataForm = data;
        this.verifyCodeStatus = true;
        this.singleClick = true;
        this.forgotPwd = false;
      },
      (err) => {
        console.log(err);
        //this.error = "Registration Error has occurred";
        swal("", err.message, "error")
      }
    );
  }

  onVerifySubmit(form: NgForm) {

    const verifyCode = form.value.codeValue;
    const newPwd = form.value.newPwd;

    this.auth.confirmPassword(verifyCode, this.userEmail, newPwd, this.dataForm)
            .then(() => this.router.navigate(['']));
  
          }

  


  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.verifyCodeForm = this.formBuilder.group({
      codeValue: ['', Validators.required],
      newPwd: ['', Validators.required]
    });

  }
}
