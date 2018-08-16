import { Component, OnInit } from '@angular/core';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { AuthorizationService } from '../authorization.service';
import { Techitems } from '../Techitems';
import { Technology } from '../Technology';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import { Questions } from '../questions';
import { Item } from '../item';
import Swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-questionpooldashboard',
  templateUrl: './questionpooldashboard.component.html',
  styleUrls: ['./questionpooldashboard.component.css']
})
export class QuestionpooldashboardComponent implements OnInit {

  items: Techitems[] = [];
  questionItems: Item[] = [];
  currentUrl: string;

  constructor(private ddb: DynamoDBService, private auth: AuthorizationService) {
  }

  ngOnInit() {
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

  display(technology: string) {
    this.questionItems = [];

    this.ddb.getQuestions(technology).subscribe((data) => {
      let jsonObj: object = JSON.parse(JSON.stringify(data));
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Questions = jsonConvert.deserializeObject(jsonObj, Questions);
      if (questions.items.length == 0) {
        Swal("No Questions available for " + technology, "Please add questions", "warning");
      }
      for (let items of questions.items) {
        this.questionItems.push(items);
      }
    }, (err) => {
      Swal("", err.message, "error")
    });

  }
}


