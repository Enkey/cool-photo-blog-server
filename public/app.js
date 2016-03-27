(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'btford.socket-io'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'post/posts.html',
                controller: 'postCtrl'
            })
            .when('/login', {
                templateUrl: 'user/login/login.html',
                controller: 'loginCtrl'
            })
            .when('/registration', {
                templateUrl: 'user/registration/registration.html',
                controller: 'registrationCtrl'
            })
            .when('/user/', {
                templateUrl: 'user/account/user.html',
                controller: 'userCtrl'
            })
            .when('/post/add', {
                templateUrl: 'post/add/add.html',
                controller: 'postAddCtrl'
            })
            .when('/post/category/:category', {
                templateUrl: 'post/posts.html',
                controller: 'postCategoryCtrl'
            })
            .when('/search/:query', {
                templateUrl: 'post/posts.html',
                controller: 'searchCtrl'
            })
            //.when('/chat', {
            //    templateUrl: 'chat/chat.html',
            //    controller: 'chatCtrl'
            //})
            .otherwise({
                redirectTo: '/'
            });
    }

    run.$inject = ['$rootScope', '$location', 'authService'];
    function run($rootScope, $location, authService) {
        //setCurrentUser if exists
        authService.checkCurrentUser();

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restricted = [
                '/user/',
                '/post/add'
            ];



            var restrictedPage = $.inArray($location.path(), restricted) !== -1;
            if (restrictedPage && $rootScope.globals && !$rootScope.globals.isAuthenticated) {
                console.log('locationChange-to-login',next);
                $location.path('/login');
            }

        });

    }


})();
