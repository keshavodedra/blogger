import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { CommonServices } from 'src/services/common.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent implements OnInit {
  title = 'Blogger For Bloovo';
  displayName;
  blogDescription: string = '';
  userid: string = '';

  constructor(private router: Router, private objCommonServices: CommonServices) {
    this.objCommonServices.displayName.subscribe(res => {
      this.displayName = res;
    })
    this.userid = localStorage.getItem("id")
   
  }

  ngOnInit() {
    if (this.displayName == undefined) {
      if (localStorage.getItem("uname") != null) {
        this.displayName = localStorage.getItem("uname");
      }
    }
  }

  ngAfterViewInit() {
    $('.modal').modal();
  }

  ShowAddBlogModel() {
    $("#addBlog").modal('open');
  }


  PostBlog() {
    debugger;
    var name = this.displayName;
    var desc = this.blogDescription;
    var data = {
      "description": desc,
      "username": name,
      "userid": localStorage.getItem("id"),
      "createdAt": new Date()
    }
    this.objCommonServices.postBlog(JSON.stringify(data)).subscribe(resp => {
      var response = resp;
      if (response != null) {
        this.blogDescription = '';
        $("#addBlog").modal('close');
        this.objCommonServices.blogList.emit();
        this.router.navigateByUrl('/blogs');
      }
    });
  }

}
