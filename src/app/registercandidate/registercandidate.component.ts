import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from "../sharedServices/authorization.service";
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService'
import { Technology } from '../sharedServices/Technology';
import { JsonConvert } from 'json2typescript';
import Swal from 'sweetalert2';
import { Technologiesweightage } from '../sharedServices/technologiesweightage';


@Component({
  selector: 'app-registercandidate',
  templateUrl: './registercandidate.component.html',
  styleUrls: ['./registercandidate.component.css']
})
export class RegistercandidateComponent implements OnInit {


  candidateRegisterForm: FormGroup;
  technologyItems: Array<string> = [];
  technologyName = new FormControl();
  

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
    this.getAllTechnologies();
  }

  getAllTechnologies() {
    this.ddb.getTechnologies().subscribe((data) => {
      let jsonObj: object = JSON.parse(JSON.stringify(data));
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Technology = jsonConvert.deserializeObject(jsonObj, Technology);
      for (let items of questions.items) {
        this.technologyItems.push(items.techname);
      }
    }, (err) => {
      Swal("", err.message, "error")
    });

  }
  registerCandidate(form: NgForm) {

    const email = form.value.candidateEmail;
    const secretCode = Math.floor(100000 + Math.random() * 900000);
    const candidateName = form.value.candidateName;
    let date = new Date().toString();
    let technologiesWeightage: Technologiesweightage[] = [];
    this.technologyName.value.forEach(function (value: string) {
      technologiesWeightage.push(new Technologiesweightage(value, 10));
    })
    if (this.technologyName.value.length == 0) {
      Swal("", "Any one technnology must be selected", "error");
    } else {
      this.ddb.writeToCandidateLoginTbl(email, "" + secretCode, date, candidateName, technologiesWeightage)
        .then(() => this.router.navigate(['criteria/' + email]))
        .catch(() => this.router.navigate(['register-candidate']));
      this.ddb.updateRegisterCandidateFlag(email, 'REGISTERD CANDIDATE');
    }


  }

}