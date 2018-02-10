import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import {Router} from '@angular/router'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts:Post[] = [];	

  constructor(private blogService: BlogService,private router: Router) {}

  createPost():void {
  	let post:Post =this.blogService.newPost();
    this.router.navigateByUrl('/edit/' + post.postid);
  }

  ngOnInit() {
  	this.posts = this.blogService.getPosts();
  }

}
