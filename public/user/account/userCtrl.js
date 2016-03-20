angular.module('app').controller('userCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    function ($scope, userService, $rootScope, mediator) {

        mediator.$on('data:changed', function () {
            init();
        });

        function init() {
            $scope.user = userService.user;
        }

        init();

        $scope.edit = function () {
            console.log("edit");
        }

    }]);