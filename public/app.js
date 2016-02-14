var app = angular.module('app', ['ngRoute']);
app.factory('mediator', ['$rootScope', function ($rootScope) {
    return $rootScope.$new(true); // isolate
}]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/signin', {
                templateUrl: 'user/signin/signin.html',
                controller: 'signinCtrl'
            })
            .when('/signup', {
                templateUrl: 'user/signup/signup.html',
                controller: 'signupCtrl'
            })
            .when('/userInfo', {
                templateUrl: 'user/userInfo/userInfo.html',
                controller: 'userInfoCtrl'
            })
            .when('/userInfo', {
                templateUrl: 'user/userInfo/userInfo.html',
                controller: 'userInfoCtrl'
            });
    }]);

