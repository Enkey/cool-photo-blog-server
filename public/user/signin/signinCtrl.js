angular.module('app').controller('signinCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    function ($scope, userService, $rootScope, mediator) {

        $scope.signin = function () {
            userService.signin($scope.email, $scope.password)
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