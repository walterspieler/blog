import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from './post';
import { PostService } from './post.service';
import { SinglePostComponent } from './single-post.component';



@Component({
  selector: 'my-posts',
  templateUrl: 'app/posts.component.html',
  styleUrls: ['app/posts.component.css'],
  directives: [SinglePostComponent]
})
export class PostsComponent implements OnInit{
  posts : Post[];
  selectedPost : Post;
  error: any;
  addingPost : boolean;

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
   this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().then(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }
  onSelect(post: Post) { this.selectedPost = post; };

  gotoDetail() {
    this.router.navigate(['/posts', this.selectedPost.id]);
  }

  addPost() {
    console.log(' ')
    this.addingPost = true;
    this.selectedPost = null;
  }

  close(savedPost: Post) {
    this.addingPost = false;
    if (savedPost) { this.getPosts(); }
  }

  deletePost(post: Post, event: any) {
    event.stopPropagation();
    this.postService
        .delete(post)
        .then(res => {
          this.posts = this.posts.filter(p => p !== post);
          if (this.selectedPost === post) { this.selectedPost = null; }
        })
        .catch(error => this.error = error);
  }

}
