angular.module('app').controller('infoCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    function ($scope, userService, $rootScope, mediator) {

        mediator.$on('data:changed', function () {
            init();
        });

        function init() {

            $scope.user = userService.user;
            if ($scope.user) {
                $scope.username = $scope.user.username;
            }
        }

        init();

        $scope.edit = function () {
            console.log("edit");
        }

    }]);