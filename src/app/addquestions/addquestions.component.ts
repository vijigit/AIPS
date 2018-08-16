import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from "../authorization.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { Techitems } from '../Techitems';
import { Technology } from '../Technology';
import { JsonConvert } from 'json2typescript';
import Swal from 'sweetalert2';
import { Questions } from '../questions';
import { Item } from '../item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  items: Techitems[] = [];
  itemsMap: Map<string, string> = new Map<string, string>();
  selectedTechnology: string = "";
  newQuest: Array<string> = [];

  constructor(private router: Router, private auth: AuthorizationService, private formBuilder: FormBuilder,
    public ddb: DynamoDBService) {

  }

  ngOnInit() {
    this.getAllTechnologies();
  }

  getAllTechnologies() {
    this.items = [];
    this.ddb.getTechnologies().subscribe((data) => {
      let jsonObj: object = JSON.parse(JSON.stringify(data));
      let jsonConvert: JsonConvert = new JsonConvert();
      let questions: Technology = jsonConvert.deserializeObject(jsonObj, Technology);
      for (let itm of questions.items) {
        this.items.push(itm);
        this.itemsMap.set(itm.techname, itm.techname);
      }
    }, (err) => {
      Swal("", err.message, "error")
    });

  }

  addTechnology() {
    Swal({
      title: 'Add New Technology',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      inputPlaceholder: 'Technology Name',
      inputValidator: (value) => {
        return !value && 'Technology name is required!'
      }
    }).then((result) => {
      if (result.value) {
        this.ddb.writeToTechnologyTbl(result.value)
        Swal(
          'Added!',
          'Your technology has been added',
          'success'
        )
        window.location.reload(true);
      }
    })
  }

  addQuestion() {
    let quesJsonStr = [];
    Swal({
      title: 'Select Technology',
      input: 'select',
      inputOptions: this.itemsMap,
      inputPlaceholder: 'Select Technology',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'Technology should be selected to add question'
      }
    }).then((result) => {
      if (result.value) {
        this.selectedTechnology = result.value;
        const values = [];
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          progressSteps: ['1', '2', '3', '4', '5', '6'],
          inputValidator: (value) => {
            return !value && 'Mandatory Field!!'
          }
        }).queue([
          {
            title: 'Question',
            input: 'textarea',
          },
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Answer'
        ]).then((result) => {
          if (result.value) {
            quesJsonStr = result.value
            Swal({
              title: 'All done!',
              html:
                'Your Question: <pre><code style="white-space: pre-wrap;">' +
                JSON.stringify(result.value) +
                '</code></pre>',
              confirmButtonText: 'Confirm',
              showCancelButton: true,
            }).then((result) => {
              if (result.value) {
                this.writeIntoQuestionPool(quesJsonStr);
                Swal("", "Question added successfuly", "success");
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal("", "You have cancelled the question", "error");
              }
            })
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal("", "You have cancelled", "error");
      }
    })

  }

  writeIntoQuestionPool(questionItem: Array<string>) {

    let item = new Item();
    item.question = questionItem[0];
    item.option1 = questionItem[1];
    item.option2 = questionItem[2];
    item.option3 = questionItem[3];
    item.option4 = questionItem[4];
    item.answer = questionItem[5];
    item.techName = this.selectedTechnology;

    this.ddb.writeQuestionsIntoQuestionPool(item);



  }
}
