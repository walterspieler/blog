import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {

  private postsUrl = 'app/posts';  // URL to web api

  constructor(private http: Http) { }

  getPosts(){
    console.log('get Posts');
    return this.http.get(this.postsUrl)
    .toPromise()
    .then(res => res.json().data as Post[])
    .catch(this.handleError)
  }
  getPost(id: number) {
    return this.getPosts().then(posts => posts.find(post => post.id === id));
  }

  // Add new Hero
  private post(post: Post): Promise<Post> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http
               .post(this.postsUrl, JSON.stringify(post), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(post: Post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.postsUrl}/${post.id}`;

    return this.http
               .put(url, JSON.stringify(post), {headers: headers})
               .toPromise()
               .then(() => post)
               .catch(this.handleError);
  }

  delete(post : Post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.postsUrl}/${post.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  save(post : Post): Promise<Post>  {
    if (post.id) {
      return this.put(post);
    }
    return this.post(post);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
