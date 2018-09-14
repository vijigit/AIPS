import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices/data.service';
import {Observable } from 'rxjs';
import {ActivatedRoute } from '@angular/router' ;
//import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$ : Object;
  postId : Object;
  singlePost :Object;

  constructor(private data : DataService, private route : ActivatedRoute) { 
    this.route.params.subscribe ( params => this.postId = params.id );
  }

  ngOnInit() {
    this.data.getPosts().subscribe(data => this.posts$ =data );    
  }

  clickPopup(){
  
  }
}
