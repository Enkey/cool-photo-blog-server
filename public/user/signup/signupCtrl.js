angular.module('app').controller('signupCtrl', ['$scope', 'userService', function ($scope, userService) {
    $scope.signup = function () {
        userService.signup($scope.username, $scope.password);
    };
}]);