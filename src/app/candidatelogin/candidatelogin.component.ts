import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationService } from "../authorization.service";
import { NgForm } from "@angular/forms";
import swal from 'sweetalert'
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { CandidateServiceModule } from '../candidate-service/candidate-service.module'


@Component({
  selector: 'app-candidatelogin',
  templateUrl: './candidatelogin.component.html',
  styleUrls: ['./candidatelogin.component.css']
})
export class CandidateloginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private candidateService : CandidateServiceModule, private formBuilder: FormBuilder, private router: Router, private auth: AuthorizationService, private ddbService: DynamoDBService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const secretCode = form.value.password;
    this.ddbService.getDataFromCandidateLoginTbl(email, secretCode)
      .then( () => this.router.navigate(['candidate-login/candidate-dashboard/'+email]))
      .catch( () => this.router.navigate(['candidate-login']));
      
      

  }

}
