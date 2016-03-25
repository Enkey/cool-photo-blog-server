angular.module('app').controller('signupCtrl', ['$scope', 'userService', 'mediator', '$rootScope',
    function ($scope, userService, mediator, $rootScope) {

        $scope.signup = function () {

            if ($scope.password != $scope.password2) {
                $scope.error = "Password mismatch. Enter again...";
                return;
            }

            userService.signup($scope.username, $scope.password)
                .then(function (data) {

                    $rootScope.isAuthenticated = userService.isAuthenticated;
                    document.location.href = "/#/";

                    mediator.$emit('data:changed');
                })
                .catch(function (err) {
                    $scope.error = err.message;
                });
        };
    }]);