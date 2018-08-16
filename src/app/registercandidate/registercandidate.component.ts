import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from "../authorization.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService'
import { Technology } from '../Technology';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import { Questions } from '../questions';
import { Item } from '../item';
import Swal from 'sweetalert2';
import { Techitems } from '../Techitems';

@Component({
  selector: 'app-registercandidate',
  templateUrl: './registercandidate.component.html',
  styleUrls: ['./registercandidate.component.css']
})
export class RegistercandidateComponent implements OnInit {


  candidateRegisterForm: FormGroup;
  technologies: Techitems[];
  items: Techitems[] = [];

  constructor(private router: Router, private auth: AuthorizationService, private formBuilder: FormBuilder,
    public ddb: DynamoDBService) {

  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("");
    }
    this.candidateRegisterForm = this.formBuilder.group({
      candidateEmail: ['', Validators.required],
      candidateName: ['', Validators.required]
    });
     this.getAllTechnologies()
  }

  
  getAllTechnologies() {
    this.ddb.getTechnologies().subscribe((data) => {

      let jsonObj: object = JSON.parse(JSON.stringify(data));
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Technology = jsonConvert.deserializeObject(jsonObj, Technology);
      for (let items of questions.items) {
        this.items.push(items);
      }
    }, (err) => {
      Swal("", err.message, "error")
    });

  }
  registerCandidate(form: NgForm) {

    const email = form.value.candidateEmail;
    const secretCode = Math.floor(100000 + Math.random() * 900000);
    const candidateName = form.value.candidateName;

    this.ddb.writeLogEntry(email, "" + secretCode, candidateName);


  }

  selectValue(selectedValue : string) {

  }

}
