import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'single-post',
  templateUrl: 'app/single-post.component.html',
  styleUrls : ['app/single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy{
  @Input() post: Post;
  @Output() close = new EventEmitter();
  error : any;
  sub: any;
  navigated = false; //true if navigated here

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.postService.getPost(id)
            .then(post => this.post = post);
      } else {
        this.navigated = false;
        this.post = new Post();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
  this.postService
      .save(this.post)
      .then(post => {
        this.post = post; // saved hero, w/ id if new
        this.goBack(post);
      })
      .catch(error => this.error = error); // TODO: Display error message
}


  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  goBack(savedPost : Post = null) {
    this.close.emit(savedPost);
    if(this.navigated){window.history.back();}
  }
}
