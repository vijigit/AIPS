import { Component, OnInit } from '@angular/core';
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import { Techitems } from '../sharedServices/Techitems';
import { Technology } from '../sharedServices/Technology';
import { JsonConvert } from 'json2typescript';
import Swal from 'sweetalert2';
import { Item } from '../sharedServices/item';

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

  constructor(public ddb: DynamoDBService) {

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
    this.ddb.writeQuestionsIntoQuestionPool(new Item(questionItem[0], questionItem[1], questionItem[2], questionItem[3], questionItem[4], questionItem[5], this.selectedTechnology));
  }
}
