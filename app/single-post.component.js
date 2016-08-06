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
var post_1 = require('./post');
var post_service_1 = require('./post.service');
var SinglePostComponent = (function () {
    function SinglePostComponent(postService, route) {
        this.postService = postService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; //true if navigated here
    }
    SinglePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.postService.getPost(id)
                    .then(function (post) { return _this.post = post; });
            }
            else {
                _this.navigated = false;
                _this.post = new post_1.Post();
            }
        });
    };
    SinglePostComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SinglePostComponent.prototype.save = function () {
        var _this = this;
        this.postService
            .save(this.post)
            .then(function (post) {
            _this.post = post; // saved hero, w/ id if new
            _this.goBack(post);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    SinglePostComponent.prototype.goBack = function (savedPost) {
        if (savedPost === void 0) { savedPost = null; }
        this.close.emit(savedPost);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.Post)
    ], SinglePostComponent.prototype, "post", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SinglePostComponent.prototype, "close", void 0);
    SinglePostComponent = __decorate([
        core_1.Component({
            selector: 'single-post',
            templateUrl: 'app/single-post.component.html',
            styleUrls: ['app/single-post.component.css']
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService, router_1.ActivatedRoute])
    ], SinglePostComponent);
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;
//# sourceMappingURL=single-post.component.js.map