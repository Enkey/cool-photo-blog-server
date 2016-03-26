var app = angular.module('app', ['ngRoute', 'btford.socket-io']);
app.factory('mediator', ['$rootScope', function ($rootScope) {
    return $rootScope.$new(true); // isolate
}]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'post/posts.html',
                controller: 'postCtrl'
            })
            .when('/signin', {
                templateUrl: 'user/signin/signin.html',
                controller: 'signinCtrl'
            })
            .when('/signup', {
                templateUrl: 'user/signup/signup.html',
                controller: 'signupCtrl'
            })
            .when('/user/', {
                templateUrl: 'user/account/user.html',
                controller: 'userCtrl'
            })
            .when('/post/add', {
                templateUrl: 'post/add.html',
                controller: 'postCtrl'
            })
            .when('/post/category/:category', {
                templateUrl: 'post/posts.html',
                controller: 'postCategoryCtrl'
            })
            .when('/search/:query', {
                templateUrl: 'post/posts.html',
                controller: 'searchCtrl'
            })
            .when('/chat', {
                templateUrl: 'chat/chat.html',
                controller: 'chatCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

