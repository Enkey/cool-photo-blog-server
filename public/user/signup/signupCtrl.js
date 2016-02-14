angular.module('app').controller('signupCtrl', ['$scope', 'userService', 'mediator', function ($scope, userService, mediator) {

    function init() {
        $scope.isAuthenticated = userService.isAuthenticated;
    }

    init();

    mediator.$on('my:event', function () {
        init();
    });

    $scope.signup = function () {
        userService.signup($scope.username, $scope.password);
        init();
    };
}]);