import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { JsonConvert } from 'json2typescript';
import { Criteria } from '../sharedServices/criteria';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'
import { CandidateQuestion } from '../sharedServices/select-question';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidatedashboard',
  templateUrl: './candidatedashboard.component.html',
  styleUrls: ['./candidatedashboard.component.css']
})
export class CandidatedashboardComponent implements OnInit {

  candidateName: string = "";
  user: Object;
  testDuration = {}
  questionItems: Object[] = [];
  p: number = 1;
  timerConfig = {};
  candidateQuestions: Object[] = [];
  noOfQuestions: number;
  questionIndex: number = 0;
  isDispInstruction : boolean = true;
  closeResult: string;




  constructor(private route: ActivatedRoute, private ddb: DynamoDBService, private router: Router,private modalService: NgbModal) {
    this.route.params.subscribe(params => this.user = params.email);

  }

  ngOnInit() {
    console.log(this.user);
    this.getCriteriaDetails(this.user);

  }

  getCriteriaDetails(user) {
    this.ddb.getDetailsFromCandidateCriteriaTbl(user)
      .subscribe((data) => {
        let jsonObj: object = JSON.parse(JSON.stringify(data));
        let jsonConvert: JsonConvert = new JsonConvert();
        let criteria: Criteria = jsonConvert.deserializeObject(jsonObj, Criteria);
        this.candidateName = criteria.Item.CandidateName;
        this.testDuration = criteria.Item.testDuration;
        let testDuraitonInSec = (criteria.Item.testDuration.hour * 60 * 60) + (criteria.Item.testDuration.minute * 60) + (criteria.Item.testDuration.second);
        this.timerConfig = {
          leftTime: testDuraitonInSec
        }

      });

    this.ddb.getQuestionsForCandidate(user).subscribe((questions) => {
      if (questions.Item) {
        let quesJson = JSON.parse(JSON.stringify(questions.Item));
        let quesItems = JSON.parse(JSON.stringify(quesJson))
        let ques = JSON.parse(quesItems.Questions);
        this.questionItems = ques.Items;
        this.noOfQuestions = ques.Items.length - 1;
        this.candidateQuestions.push(this.questionItems[this.questionIndex]);

      } else {
        console.log(JSON.stringify(questions.Items))
        Swal("", "Test Not Available!!!", "error");
        this.router.navigate(['candidate-login'])
      }

    });

  }

  onStart() {

  }

  onFinished() {

  }

  trackByQuestions(selecQues: CandidateQuestion) {
    return selecQues.id;
  }

  getNextQuestion() {
    console.log("getNextQuesiton" + this.questionIndex)
    this.questionIndex = this.questionIndex + 1;
    this.candidateQuestions = [];
    this.candidateQuestions.push(this.questionItems[this.questionIndex]);
  }

  getPrevQuestion() {
    this.questionIndex = this.questionIndex - 1;
    this.candidateQuestions = [];
    this.candidateQuestions.push(this.questionItems[this.questionIndex]);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
    
  }

  disableInstr() {
    this.isDispInstruction = false;
  }

  submitTest() {
    Swal("You have completed the Test!!","", "success");
    this.router.navigate(['candidate-login'])
  }





}
