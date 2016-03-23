angular.module('app').run(['userService', '$rootScope', 'mediator', function (userService, $rootScope, mediator) {
    console.log('run-userService-file');
    userService.checkIsAuthenticated().then(function (response) {
        userService.isAuthenticated = response.data.isAuthenticated;
        $rootScope.isAuthenticated = userService.isAuthenticated;
        userService.user = response.data.user;
        if (userService.user) {
            console.log('Run user: ' + userService.user.username);
        }
        mediator.$emit('data:changed');
    });
}]);


angular.module('app').service('userService', ['$http', '$q', function ($http, $q) {
    var _this = this;
    this.user = null;

    this.checkIsAuthenticated = function () {

        return $http({
            method: 'GET',
            url: 'auth/is-authenticated'
        });

    };


    this.signup = function (username, password) {

        return $http({
            method: 'POST',
            url: 'auth/signup',
            data: {
                username: username,
                password: password
            }
        }).then(function (response) {
            console.log('Sing up');
            console.log(response.data);
            if (response.data.success === true) {
                _this.isAuthenticated = true;
                _this.user = response.data.user;
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }

        });


    };

    this.signin = function (username, password) {

        return $http({
            method: 'POST',
            url: 'auth/signin',
            data: {
                username: username,
                password: password
            }
        }).then(function (response) {
            console.log('Sing in');
            console.log(response.data);
            if (response.data.success === true) {
                _this.isAuthenticated = true;
                _this.user = response.data.user;
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }

        });

    };

    this.logout = function () {

        return $http({
            method: 'GET',
            url: 'auth/logout'
        }).then(function (response) {
            console.log('Log out');
            console.log(response.data);
            if (response.data.success === true) {
                _this.isAuthenticated = false;
                _this.user = null;
            }
            return response;
        });

    };

    this.setAvatar = function (avatar_id) {

        return $http({
            method: 'POST',
            url: 'users/save',
            data: {
                avatar_id: avatar_id
            }
        }).then(function (response) {
            if (response.data.success === true) {
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }
        });
    };

}]);
