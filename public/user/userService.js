angular.module('app').service('userService', ['$http', '$q', function ($http, $q) {
    this.username = undefined;
    this.email = undefined;
    this.username = undefined;
    this.isAuthenticated = false;
    var _this = this;

    this.signup = function (username, password) {


        return $http({
            method: 'POST',
            url: 'auth/signup',
            data: {
                username: username,
                password: password
            }
        }).then(function (response) {
            console.log(response.data);
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
            console.log(response.data);
            if (response.data.success === true) {
                console.log("sign in");
                _this.isAuthenticated = true;
            }
        });

    };

    this.logout = function () {

        return $http({
            method: 'POST',
            url: 'auth/logout'
        }).then(function (response) {
            console.log(response.data);
            if (response.data.success === true) {
                console.log("logout");
                _this.isAuthenticated = false;
            }
        });

    };

}]);