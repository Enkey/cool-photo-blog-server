(function () {
    'use strict';

    angular
        .module('app')
        .controller('logoutCtrl', logoutCtrl);

    logoutCtrl.$inject = ['$scope', '$rootScope', 'authService'];
    function logoutCtrl($scope, $rootScope, authService) {

        $scope.logout = logout;


        function logout() {
            authService.logout();
        }


    }


    //['$scope', '$rootScope', 'userService', 'mediator',
    //function ($scope, $rootScope, userService, mediator) {
    //
    //    $scope.logout = function () {
    //        userService.logout().then(function () {
    //            $rootScope.isAuthenticated = false;
    //            document.location.href = "/#/";
    //            mediator.$emit('data:changed');
    //        });
    //    };
    //
    //}]);


})();