angular.module('app').controller('logoutCtrl', ['$scope', '$rootScope', 'userService', 'mediator', function ($scope, $rootScope, userService, mediator) {

    function init() {
        $scope.isAuthenticated = userService.isAuthenticated;
    }

    init();

    mediator.$on('my:event', function () {
        init();
    });

    $scope.logout = function () {
        userService.logout().then(function () {
            mediator.$emit('my:event');
        });
    };

}]);