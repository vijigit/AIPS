import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from "../authorization.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { JsonConvert } from 'json2typescript';
import { Questions } from '../questions';
import { Item } from '../item';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-javaquestions',
  templateUrl: './javaquestions.component.html',
  styleUrls: ['./javaquestions.component.css']
})
export class JavaquestionsComponent implements OnInit {

  items: Item[] = []; 

  constructor(private router: Router, private ddb: DynamoDBService, private auth: AuthorizationService, private formBuilder: FormBuilder) {
    this.getAllQuestions();
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("");
    }
  }

  getAllQuestions() {

    this.ddb.getDataFromJavaQuestionPool().subscribe((data) => {

      
      let jsonObj: object = JSON.parse(JSON.stringify(data));

      // Now you can map the json object to the TypeScript object automatically
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Questions = jsonConvert.deserializeObject(jsonObj, Questions);
      for(let items of questions.items) {
        this.items.push(items);
      }      

    }, (err) => {
      swal("", err.message, "error")
    });

  }

}
