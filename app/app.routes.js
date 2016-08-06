"use strict";
var router_1 = require('@angular/router');
var posts_component_1 = require('./posts.component');
var dashboard_component_1 = require('./dashboard.component');
var single_post_component_1 = require('./single-post.component');
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        component: posts_component_1.PostsComponent
    },
    {
        path: 'posts/:id',
        component: single_post_component_1.SinglePostComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map