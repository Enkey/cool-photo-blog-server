angular.module('app').controller('signupCtrl', ['$scope', 'userService', 'mediator', '$rootScope',
    function ($scope, userService, mediator, $rootScope) {

        $scope.signup = function () {
            userService.signup($scope.username, $scope.password, $scope.email).then(function (response) {
                if (response.data.success === true) {
                    $rootScope.isAuthenticated = true;
                    document.location.href = "/#/";
                }

                mediator.$emit('data:changed');
            });
        };
    }]);