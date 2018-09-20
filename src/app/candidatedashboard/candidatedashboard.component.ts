import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { JsonConvert } from 'json2typescript';
import { Criteria } from '../sharedServices/criteria';
import { Questions } from '../sharedServices/questions';

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
        this.candidateName = criteria.Item.CandidateName;
        this.testDuration = criteria.Item.testDuration;
        let testDuraitonInSec = (criteria.Item.testDuration.hour * 60 * 60) + (criteria.Item.testDuration.minute * 60) + (criteria.Item.testDuration.second);
        //console.log(testDuraitonInSec);
        this.timerConfig = {
          leftTime: testDuraitonInSec
        }

      });

    this.ddb.getQuestionsForCandidate(user).subscribe((questions) => {
      let quesJson = JSON.parse(JSON.stringify(questions.Items));
      let quesItems = JSON.parse(JSON.stringify(quesJson[0].Questions))
      let ques = JSON.parse(quesItems);
      console.log(ques.Items);
      
      this.questionItems = ques.Items;
    });

  }

  onStart() {

  }

  onFinished() {

  }

  isNext(index: number) {
    if (index == 0) {
      return true
    }
    else if (index == this.questionItems.length - 1) {
      return false;
    }
    else {
      return false;
    }
  }

  isPrevious(index: number) {
    if (index > 0) {
      return true
    }
    else {
      return false;
    }
  }
}
