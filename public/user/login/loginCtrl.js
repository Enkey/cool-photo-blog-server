(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'authService', '$location'];
    function loginCtrl($scope, authService, $location) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = login;

        function login() {
            authService.login($scope.credentials)
                .then(function () {
                    $location.path('/');
                    $scope.error = null;
                })
                .catch(function (res) {
                    $scope.error = res.message;
                });
        }
    }
})();