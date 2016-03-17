angular.module('app').controller('logoutCtrl', ['$scope', '$rootScope', 'userService', 'mediator',
    function ($scope, $rootScope, userService, mediator) {

    $scope.logout = function () {
        userService.logout().then(function () {
            $rootScope.isAuthenticated = false;
            document.location.href = "/#/";
            mediator.$emit('data:changed');
        });
    };

}]);