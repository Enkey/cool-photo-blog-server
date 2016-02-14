angular.module('app').controller('signinCtrl', ['$scope', 'userService', 'mediator', function ($scope, userService, mediator) {

    function init() {
        $scope.isAuthenticated = userService.isAuthenticated;
    }

    init();

    mediator.$on('my:event', function () {
        init();
    });

    $scope.signin = function () {
        userService.signin($scope.username, $scope.password).then(function () {
            mediator.$emit('my:event');
        });

    };
}]);