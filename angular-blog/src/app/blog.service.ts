import { Injectable, OnInit } from '@angular/core';

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}

@Injectable()
export class BlogService {

	private posts: Post[] = [];
	maxPostId: number;
//  private listPosts: Post[] = [];		

  constructor() { this.maxPostId=0; this.fetchPosts(); }



  fetchPosts(): void{
  	for(let i=0;i<localStorage.length;i++) {
  		let temp: Post = JSON.parse(localStorage.getItem(localStorage.key(i))); 
  		if(temp.postid > this.maxPostId) { this.maxPostId = temp.postid; }
  		this.posts.push(temp);
  	}
  }

  getPosts(): Post[] { return this.posts; }

  getPost(id: number): Post {
  	
  	for (let post of this.posts)
  	{
  		if(post.postid == id)
  			return	post;
  	}
  	return null;
  }


  newPost(): Post {
  	let temp:Post = new Post();
  	temp.postid = this.maxPostId + 1;
  	temp.created = new Date(); 
  	temp.modified = new Date();
  	temp.title = ""; 
  	temp.body = ""; 
  	this.maxPostId++; 
  	localStorage.setItem((temp.postid).toString(),JSON.stringify(temp));
  	this.posts.push(temp);
  	return temp; 
  }

	updatePost(post: Post): void {
		for(let i:number=0;i<this.posts.length;i++) {
			if(this.posts[i].postid == post.postid) {
				this.posts[i] = post;
				localStorage.setItem(post.postid.toString(),JSON.stringify(post));
			}
		}
	}

	deletePost(postid: number): void {
		for(let i:number=0;i<this.posts.length;i++) {
			if(this.posts[i].postid == postid) {
				this.posts.splice(i,1);
				localStorage.removeItem(postid.toString()); 
			}
		}
	}


}
