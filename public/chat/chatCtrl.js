angular.module('app').controller('chatCtrl', ['$scope', 'chatService', 'locationService', 'userService', 'mediator',
    function ($scope, chatService, locationService, userService, mediator) {
        $scope.msg = 'OK - Chat';

        if (!userService.isAuthenticated) {
            locationService.changeLocation('#/chat', '#/signin');
        }

        mediator.$on('data:changed', function () {
            if (userService.user) {

                locationService.restoreLocation();
            }
        });


        $scope.getMessage = function () {
            $scope.msg = chatService.getMessage();
        };

    }]);