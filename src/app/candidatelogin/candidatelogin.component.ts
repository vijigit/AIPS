import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorizationService} from "../authorization.service";
import {NgForm} from "@angular/forms";
import swal from 'sweetalert'

@Component({
  selector: 'app-candidatelogin',
  templateUrl: './candidatelogin.component.html',
  styleUrls: ['./candidatelogin.component.css']
})
export class CandidateloginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthorizationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

}
