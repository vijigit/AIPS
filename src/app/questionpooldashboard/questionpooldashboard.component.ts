import { Component, OnInit } from '@angular/core';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { AuthorizationService } from '../authorization.service';
import { Techitems } from '../Techitems';
import { Technology } from '../Technology';
import { JsonConvert } from 'json2typescript';
import { Questions } from '../questions';
import { Item } from '../item';

@Component({
  selector: 'app-questionpooldashboard',
  templateUrl: './questionpooldashboard.component.html',
  styleUrls: ['./questionpooldashboard.component.css']
})
export class QuestionpooldashboardComponent implements OnInit {

  items: Techitems[] = [];
  questionItems: Item[] = [];

  constructor(private ddb: DynamoDBService, private auth: AuthorizationService) {
    this.getAllTechnologies()
  }

  ngOnInit() {
  }

  getAllTechnologies() {
    this.ddb.getTechnologies().subscribe((data) => {

      let jsonObj: object = JSON.parse(JSON.stringify(data));
      console.log(JSON.stringify(data))
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Technology = jsonConvert.deserializeObject(jsonObj, Technology);
      for (let items of questions.items) {
        this.items.push(items);
      }
    }, (err) => {
      swal("", err.message, "error")
    });

  }

  display(technology: string) {
    this.questionItems = [];

    this.ddb.getQuestions(technology.toUpperCase()).subscribe((data) => {
      let jsonObj: object = JSON.parse(JSON.stringify(data));
      console.log(JSON.stringify(data))
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Questions = jsonConvert.deserializeObject(jsonObj, Questions);
      if (questions.items.length == 0) {
        swal("No Questions available for " + technology, "Please add questions", "warning");
      }
      for (let items of questions.items) {
        this.questionItems.push(items);
      }
    }, (err) => {
      swal("", err.message, "error")
    });

  }
}


