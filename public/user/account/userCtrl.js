angular.module('app').controller('userCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    function ($scope, userService, $rootScope, mediator) {

        mediator.$on('data:changed', function () {
            init();
        });

        function init() {
            if (userService.user) {
                $scope.username = userService.user.username;
            }
        }

        init();

        $scope.edit = function () {
            console.log("edit");
        }

    }]);