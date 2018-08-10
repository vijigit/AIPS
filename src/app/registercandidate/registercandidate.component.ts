import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from "../authorization.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService'

@Component({
  selector: 'app-registercandidate',
  templateUrl: './registercandidate.component.html',
  styleUrls: ['./registercandidate.component.css']
})
export class RegistercandidateComponent implements OnInit {


  candidateRegisterForm: FormGroup;
  technologies: any[];

  constructor(private router: Router, private auth: AuthorizationService, private formBuilder: FormBuilder, 
    public ddb: DynamoDBService) {
    this.technologies = ["JAVA"];
  }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl("");
  }
    this.candidateRegisterForm = this.formBuilder.group({
      candidateEmail: ['', Validators.required],
      candidateName: ['', Validators.required]
    });
  }

  registerCandidate(form: NgForm) {

    const email = form.value.candidateEmail;
    const secretCode =  Math.floor(100000 + Math.random() * 900000)

    this.ddb.writeLogEntry(email, ""+secretCode);

    
  }

}
