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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.postsUrl = 'app/posts'; // URL to web api
    }
    PostService.prototype.getPosts = function () {
        console.log('get Posts');
        return this.http.get(this.postsUrl)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PostService.prototype.getPost = function (id) {
        return this.getPosts().then(function (posts) { return posts.find(function (post) { return post.id === id; }); });
    };
    // Add new Hero
    PostService.prototype.post = function (post) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.postsUrl, JSON.stringify(post), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Hero
    PostService.prototype.put = function (post) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.postsUrl + "/" + post.id;
        return this.http
            .put(url, JSON.stringify(post), { headers: headers })
            .toPromise()
            .then(function () { return post; })
            .catch(this.handleError);
    };
    PostService.prototype.delete = function (post) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.postsUrl + "/" + post.id;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    PostService.prototype.save = function (post) {
        if (post.id) {
            return this.put(post);
        }
        return this.post(post);
    };
    PostService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map