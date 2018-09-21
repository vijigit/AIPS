import { Component, OnInit } from '@angular/core';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { Techitems } from '../sharedServices/Techitems';
import { Technology } from '../sharedServices/Technology';
import { JsonConvert } from 'json2typescript';
import { Questions } from '../sharedServices/questions';
import { Item } from '../sharedServices/item';
import Swal from 'sweetalert2';
import { CandidateQuestion } from '../sharedServices/select-question';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-questionpooldashboard',
  templateUrl: './questionpooldashboard.component.html',
  styleUrls: ['./questionpooldashboard.component.css']
})
export class QuestionpooldashboardComponent implements OnInit {

  items: Techitems[] = [];  
  questionItems: Item[] = [];
  ques: CandidateQuestion[] = [];
  currentUrl: string;
  p: number = 1;
  index: number = (this.p * 1);
  IsTechnologyClicked: boolean;
  listOfSelectedQuestionItems: Item[] = [];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  

  constructor(private ddb: DynamoDBService) {
  }

  ngOnInit() {
    this.getAllTechnologies()
  }

  

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  trackByQuestions(selecQues: CandidateQuestion) {
    return selecQues.id;
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

  display(technology: string) {
    this.IsTechnologyClicked = false;
    this.questionItems = [];
    this.ques = [];
    this.listOfSelectedQuestionItems = [];

    this.ddb.getQuestions(technology).subscribe((data) => {
      let jsonObj: object = JSON.parse(JSON.stringify(data));
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Questions = jsonConvert.deserializeObject(jsonObj, Questions);
      if (questions.items.length == 0) {
        Swal("No Questions available for " + technology, "Please add questions", "warning");
      } else {
        this.IsTechnologyClicked = true;
      }
      let i = 1;
      for (let items of questions.items) {
        this.questionItems.push(items);
        let q = new CandidateQuestion();
        q.item = items;
        q.addQuestion = false;
        q.id = i;
        this.ques.push(q);
        i = i + 1;
      }
    }, (err) => {
      Swal("", err.message, "error")
    });


  }

  addQues(selectedQuestion: CandidateQuestion, event) {

    if (event.target.checked) {
      this.listOfSelectedQuestionItems.push(selectedQuestion.item);
      let q = this.ques.indexOf(selectedQuestion);
      this.ques[q].addQuestion = true;
      this.ques = this.ques.slice();
      console.log(this.ques[q].addQuestion)
      return this.ques[q].addQuestion

    } else {
      let index = this.listOfSelectedQuestionItems.indexOf(selectedQuestion.item);
      this.listOfSelectedQuestionItems.splice(index, 1);

      let q = this.ques.indexOf(selectedQuestion);
      this.ques[q].addQuestion = false;
      this.ques = this.ques.slice();
      console.log(this.ques[q].addQuestion)
      return this.ques[q].addQuestion
    }


  }
}


