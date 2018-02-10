import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post: Post = new Post();
  posts: Post[] = [];
  title:string = "";
  body:string = "";
  @ViewChild('myForm') myform: any;

  constructor(private blogService: BlogService,private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
  	this.route.params.subscribe(() => this.getPost());
  }



  deletePost():void {
    this.blogService.deletePost(this.post.postid);
    this.router.navigateByUrl('/');
  }

  toPreview():void {
    this.post.title = this.title;   
    this.post.body = this.body;
    this.blogService.updatePost(this.post);
    this.router.navigateByUrl('/preview/' + this.post.postid);
  }

  getPost():void {

    if(!this.myform.form.pristine)
    {
      this.saveBlog(); 
      this.myform.form.markAsPristine();
    }

  	let pid:number = Number(this.route.snapshot.paramMap.get('id'));
  	this.post = this.blogService.getPost(pid);
  	this.title = this.post.title;
  	this.body = this.post.body;
  }

  saveBlogWithoutTimeChange() {
  	this.post.title = this.title; 
  	this.post.body = this.body;
  	this.blogService.updatePost(this.post);
  }

  saveBlog(): void {
  	this.post.title = this.title; 
  	this.post.body = this.body;
  	this.post.modified = new Date();
  	this.blogService.updatePost(this.post);
    this.myform.form.markAsPristine();
  }

}
