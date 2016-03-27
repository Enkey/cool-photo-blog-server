(function () {
    'use strict';

    angular
        .module('app')
        .controller('registrationCtrl', registrationCtrl);

    registrationCtrl.$inject = ['$scope', 'authService', '$location'];
    function registrationCtrl($scope, authService, $location) {

        $scope.credentials = {
            username: '',
            password: '',
            password2: ''
        };


        $scope.register = register;

        function register() {

            if ($scope.credentials.password != $scope.credentials.password2) {
                $scope.error = "Password mismatch. Enter again...";
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


    }

})();