angular.module('app').run(['userService', 'mediator', function (userService, mediator) {
    userService.checkIsAuthenticated().then(function (response) {
        userService.isAuthenticated = response.data.isAuthenticated;
        userService.user = response.data.user;
        mediator.$emit('my:event');
    });
}]);


angular.module('app').service('userService', ['$http', function ($http) {
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
        });

    };

}]);
