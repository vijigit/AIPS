import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { JsonConvert } from 'json2typescript';
import { CandidateQuesJson } from '../sharedServices/canidateQuesJson';
import { Criteria } from '../sharedServices/criteria';
import { Questions } from '../sharedServices/questions';
import { Item } from "../sharedServices/item";

@Component({
  selector: 'app-candidatedashboard',
  templateUrl: './candidatedashboard.component.html',
  styleUrls: ['./candidatedashboard.component.css']
})
export class CandidatedashboardComponent implements OnInit {

  candidateName: string = "";
  user: Object;
  testDuration = {}
  questionItems : Item[] = [];
  p: number = 1;
  timerConfig = {};



  constructor(private route: ActivatedRoute, private ddb: DynamoDBService) {
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
        this.candidateName= criteria.Item.CandidateName;
        this.testDuration = criteria.Item.testDuration;
        let testDuraitonInSec = (criteria.Item.testDuration.hour * 60 * 60) + (criteria.Item.testDuration.minute * 60) + (criteria.Item.testDuration.second);
        //console.log(testDuraitonInSec);
        this.timerConfig = {
          leftTime :  testDuraitonInSec
        }

      });

    this.ddb.getQuestionsForCandidate(user).subscribe((questions) => {
      let jsonObj: object = JSON.parse(JSON.stringify(questions));
      let jsonConvert: JsonConvert = new JsonConvert();
      let candidateQues: CandidateQuesJson = jsonConvert.deserializeObject(jsonObj, CandidateQuesJson);

      
      let quesJsonObj: object = JSON.parse(candidateQues.questions[0].questionItems);
      let quesJsonConvert: JsonConvert = new JsonConvert();
      let question : Questions = quesJsonConvert.deserializeObject(quesJsonObj, Questions);
      this.questionItems = question.items;

    });

  }

  onStart() {

  }

  onFinished() {

  }
}
