angular.module('app').controller('signinCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
    $rootScope.isAuthenticated = userService.isAuthenticated;
    $scope.signin = function () {
        userService.signin($scope.username, $scope.password).then(function () {

            $rootScope.isAuthenticated = userService.isAuthenticated;
        });

    };
}]);