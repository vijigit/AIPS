import { Component, OnInit } from '@angular/core';
import { CandidateServiceModule } from '../candidate-service/candidate-service.module'

@Component({
  selector: 'app-candidatedashboard',
  templateUrl: './candidatedashboard.component.html',
  styleUrls: ['./candidatedashboard.component.css']
})
export class CandidatedashboardComponent implements OnInit {

  candidateName: string = "";

  constructor(private candidateService: CandidateServiceModule) { 
    this.candidateName = candidateService.getcandidateName();   

  }

  ngOnInit() {
  }

}
