import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '../sharedServices/candidate';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService'
import { JsonConvert } from 'json2typescript';
import { Technologies } from '../sharedServices/weightage';
import { AuthorizationService } from "../sharedServices/authorization.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from "@angular/forms";
import { Technologiesweightage } from '../sharedServices/technologiesweightage';
import { Questions } from '../sharedServices/questions';
import { Item } from '../sharedServices/item';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  criteriaForm: FormGroup;
  candidateEmail: string;
  canidateName: string;
  secretCode: string;
  selectedTechnologies: string;
  selectedTechnologiesArr: Array<string> = []
  time = { hour: 13, minute: 30 };
  public quesAndDuration = true;
  public weightage = true;
  public selectQuestionCollapse = true
  public quesWeightage = new Map<string, number>();
  technologyWeightage: Technologies[] = [];
  selectedWeightage: Technologiesweightage[] = [];
  questionType: string[] = ['Generate Random Question', 'Pick Questions'];
  questions: string

  constructor(private route: ActivatedRoute, private ddb: DynamoDBService,
    private auth: AuthorizationService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("");
    }
    this.route.params.subscribe(params => this.candidateEmail = params.candidateemail);
    this.criteriaForm = this.formBuilder.group({
      questions: [Validators.required],
      noOfQuestion: [Validators.required]
    });
    this.getCandidateDetails(this.candidateEmail);
  }

  getCandidateDetails(candidateEmail: string) {
    this.ddb.getCandidateDetail(candidateEmail)
      .subscribe((data) => {
        let jsonObj: object = JSON.parse(JSON.stringify(data));
        let jsonConvert: JsonConvert = new JsonConvert();
        let candidate: Candidate = jsonConvert.deserializeObject(jsonObj, Candidate);
        this.canidateName = candidate.Item.candidateName;
        this.secretCode = candidate.Item.secretcode;
        this.technologyWeightage = candidate.Item.Technologies
        let i = 1;
        candidate.Item.Technologies.forEach(techWeightages => {
          this.selectedTechnologiesArr.push(techWeightages.techname)
          techWeightages.id = i;
          i = i + 1;

        })
        this.selectedTechnologies = this.selectedTechnologiesArr.join(",");

      });
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    return value;
  }

  getWeightage(item: Technologies, selectedWeightage: number) {
    console.log("getWeightage() :" + item.techname + " : " + selectedWeightage);
    let isTechnologyWeightageExists = false;
    let keepGoing = true;
    this.selectedWeightage.forEach(value => {
      if (keepGoing) {
        if (value.TechName == item.techname) {
          value.weightage = selectedWeightage;
          isTechnologyWeightageExists = true;
          keepGoing = false;
        }
      }
    });

    if (!isTechnologyWeightageExists) {
      this.selectedWeightage.push(new Technologiesweightage(item.techname, selectedWeightage));
    }
    this.quesWeightage.set(item.techname, selectedWeightage);
  }

  onSubmit(form: NgForm) {

    this.getDefaultWeightage();
    const noOfQuestion = form.value.noOfQuestion;    
    let item: Item[] = [];

    this.ddb.writeIntoCriteriaTbl(this.candidateEmail, this.canidateName, noOfQuestion, this.time, this.questions, this.selectedWeightage)
      .then(() => this.router.navigate(['register-candidate'])) // need to check
      .catch(() => this.router.navigate(['criteria/' + this.candidateEmail]));

    if (this.questions = "Generate Random Question") {
      this.selectedWeightage.forEach(technology => {
        this.ddb.getQuestions(technology.TechName).subscribe((data) => {
          let jsonObj: object = JSON.parse(JSON.stringify(data));
          let jsonConvert: JsonConvert = new JsonConvert();
          let questions: Questions = jsonConvert.deserializeObject(jsonObj, Questions);
          questions.items.sort(function () { return 0.5 - Math.random() });
          questions.items.forEach(value => {
            let index = 1;
            if (index <= technology.weightage) {
              item.push(new Item(value.question, value.option1, value.option2, value.option3, value.option4, value.answer, value.techName));
              let candidateQuestions = new Questions();
              candidateQuestions.items = item;
              let jsonConvert: JsonConvert = new JsonConvert();
              let randomQuestions: Questions = jsonConvert.serializeObject(candidateQuestions);
              this.ddb.writeIntoCandidateQuestionTbl(this.candidateEmail, JSON.stringify(randomQuestions));
            }
            index = index + 1;
          });

          this.router.navigate(['users-dashboard']);

        //  console.log(JSON.stringify(item));

        }, (err) => {
          Swal("", err.message, "error");
        });
      });
    }

  }

  trackByCandidate(technologies: Technologies) {
    return technologies.id

  }

  getDefaultWeightage() {
    console.log(JSON.stringify(this.selectedTechnologiesArr));
    this.selectedTechnologiesArr.forEach(technology => {
      let technologyExists = false;
      let keepGoing = true;
      this.selectedWeightage.forEach(value => {
        if (keepGoing) {
          if (value.TechName == technology) {
            technologyExists = true;
            keepGoing = false;
          }
        }
      });
      if (!technologyExists) {
        this.selectedWeightage.push(new Technologiesweightage(technology, 10));
      }
    });
    console.log(JSON.stringify(this.selectedWeightage));
  }

}
