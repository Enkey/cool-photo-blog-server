angular.module('app').controller('signupCtrl', ['$scope', 'userService', 'mediator', '$rootScope',
    function ($scope, userService, mediator, $rootScope) {

        $scope.signup = function () {
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