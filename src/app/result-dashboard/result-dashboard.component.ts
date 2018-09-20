import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../sharedServices/authorization.service";
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from "@angular/forms";
import { DynamoDBService } from '../sharedServices/dynamoDbService';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-result-dashboard',
  templateUrl: './result-dashboard.component.html',
  styleUrls: ['./result-dashboard.component.css']
})
export class ResultDashboardComponent implements OnInit {

  details = [];
  displayedColumns: string[] = ['Email', 'CandidateName', 'NoOfQuestion', 'Status'];
  dataSource = new MatTableDataSource(this.details);

  constructor(private ddb: DynamoDBService) { }

  ngOnInit() {
    this.getAllDetils();
  }

  getAllDetils() {
    this.ddb.getTestDetails().subscribe((data) => {
      this.details = data.Items

    }, (err) => {
      Swal("", err.message, "error")
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
