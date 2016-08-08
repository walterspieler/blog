import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { PostService }     from './post.service';
import './rxjs-extensions';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Blog</a>
      <a [routerLink]="['/posts']" routerLinkActive="active">Posts</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [PostService]
})
export class AppComponent {
  title = 'Matt\'s Blog';
}
