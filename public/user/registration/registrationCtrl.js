(function () {
    'use strict';

    angular
        .module('app')
        .controller('registrationCtrl', registrationCtrl);

    registrationCtrl.$inject = ['$scope', 'authService', '$location', '$timeout'];
    function registrationCtrl($scope, authService, $location, $timeout) {

        $scope.credentials = {
            username: '',
            password: '',
            password2: ''
        };


        $scope.register = register;
        $scope.reset = reset;

        function register() {

            if ($scope.$$childTail.registrationForm.$invalid) {
                $scope.$broadcast('validation-checker-check');
                return;
            }

            authService.register($scope.credentials)
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
                password: '',
                password2: ''
            };
            $scope.error = null;
            $timeout(function() {
                $scope.$broadcast('validation-checker-reset');
            }, 0, false);
            $scope.$$childTail.registrationForm.$setPristine();
        }

    }

})();