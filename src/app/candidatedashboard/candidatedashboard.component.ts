import { Component, OnInit } from '@angular/core';
import { CandidateServiceModule } from '../candidate-service/candidate-service.module'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-candidatedashboard',
  templateUrl: './candidatedashboard.component.html',
  styleUrls: ['./candidatedashboard.component.css']
})
export class CandidatedashboardComponent implements OnInit {

  candidateName: string = "";
  user: Object ;
  constructor(private candidateService: CandidateServiceModule, private route: ActivatedRoute) { 
 
    this.route.params.subscribe(params => this.user = params.email); 

  }

  ngOnInit() {
    console.log(this.user);
  }

}
