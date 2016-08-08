"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var post_service_1 = require('./post.service');
var single_post_component_1 = require('./single-post.component');
var PostsComponent = (function () {
    function PostsComponent(router, postService) {
        this.router = router;
        this.postService = postService;
    }
    PostsComponent.prototype.ngOnInit = function () {
        this.getPosts();
    };
    PostsComponent.prototype.getPosts = function () {
        var _this = this;
        this.postService.getPosts().then(function (posts) {
            console.log(posts);
            _this.posts = posts;
        });
    };
    PostsComponent.prototype.onSelect = function (post) { this.selectedPost = post; };
    ;
    PostsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/posts', this.selectedPost.id]);
    };
    PostsComponent.prototype.addPost = function () {
        console.log(' ');
        this.addingPost = true;
        this.selectedPost = null;
    };
    PostsComponent.prototype.close = function (savedPost) {
        this.addingPost = false;
        if (savedPost) {
            this.getPosts();
        }
    };
    PostsComponent.prototype.deletePost = function (post, event) {
        var _this = this;
        event.stopPropagation();
        this.postService
            .delete(post)
            .then(function (res) {
            _this.posts = _this.posts.filter(function (p) { return p !== post; });
            if (_this.selectedPost === post) {
                _this.selectedPost = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'my-posts',
            templateUrl: 'app/posts.component.html',
            styleUrls: ['app/posts.component.css'],
            directives: [single_post_component_1.SinglePostComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, post_service_1.PostService])
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
