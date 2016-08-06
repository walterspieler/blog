import { provideRouter, RouterConfig }  from '@angular/router';
import { PostsComponent } from './posts.component';
import { DashboardComponent } from './dashboard.component';
import { SinglePostComponent } from './single-post.component';

const routes: RouterConfig = [
  {
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];
