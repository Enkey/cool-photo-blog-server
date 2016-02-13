angular.module('app').controller('logoutCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
    $rootScope.isAuthenticated = userService.isAuthenticated;
    $scope.logout = function () {
        userService.logout().then(function () {

            $rootScope.isAuthenticated = userService.isAuthenticated;
        });
    };

}]);