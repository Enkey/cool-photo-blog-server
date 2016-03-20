var app = angular.module('app', ['ngRoute', 'btford.socket-io']);
app.factory('mediator', ['$rootScope', function ($rootScope) {
    return $rootScope.$new(true); // isolate
}]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
                controller: 'mainCtrl'
            })
            .when('/signin', {
                templateUrl: 'user/signin/signin.html',
                controller: 'signinCtrl'
            })
            .when('/signup', {
                templateUrl: 'user/signup/signup.html',
                controller: 'signupCtrl'
            })
            .when('/userInfo', {
                templateUrl: 'user/info/info.html',
                controller: 'infoCtrl'
            })
            .when('/post', {
                templateUrl: 'post/post.html',
                controller: 'postCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

