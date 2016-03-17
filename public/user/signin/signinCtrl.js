angular.module('app').controller('signinCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    function ($scope, userService, $rootScope, mediator) {

        $scope.signin = function () {
            userService.signin($scope.username, $scope.password).then(function (response) {
                if (response.data.success === true) {
                    $rootScope.isAuthenticated = true;
                    document.location.href = "/#/";
                }

                mediator.$emit('data:changed');
            });
        };
    }]);