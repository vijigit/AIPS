import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user: Object;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.user = params.id);
  }

  ngOnInit() {
    this.data.getUser(this.user).subscribe(data => this.user = data);
    
  }

}
