(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'authService', '$location', '$timeout'];
    function loginCtrl($scope, authService, $location, $timeout) {
        $scope.loginForm = {};

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = login;
        $scope.reset = reset;
        function login() {

            if ($scope.$$childTail.loginForm.$invalid) {
                $scope.$broadcast('validation-checker-check');
                return;
            }

            authService.login($scope.credentials)
                .then(function () {
                    $location.path('/');
                    $scope.error = null;
                })
                .catch(function (res) {
                    $scope.error = res.message;
                });
        }

        function reset() {
            $scope.credentials = {
                username: '',
                password: ''
            };
            $scope.error = null;
            $scope.$broadcast('validation-checker-reset');
            $scope.$$childTail.loginForm.$setPristine();
        }
    }
})();