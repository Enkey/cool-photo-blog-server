(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', function ($scope, userService, fileUploadService, $rootScope) {
        init();


        function init() {
            if ($rootScope.globals.isAuthenticated) {
                $scope.avatarUrl = $rootScope.globals.user.avatar;
                $scope.user = $rootScope.globals.user;

                if ($scope.avatarUrl == null) {
                    $scope.avatarUrl = "images/alien.png";
                }
            }
        }


        $scope.edit = function () {
            var file = $scope.file;
            var uploadUrl = '/file/upload';
            fileUploadService
                .uploadFileToUrl(file, uploadUrl)
                .then(function (data) {

                    userService
                        .setAvatar(data.image.id)
                        .then(function (res) {
                            $scope.error = "";
                        })
                        .catch(function (res) {
                            $scope.error = res.message;
                        });
                })
                .catch(function (data) {
                    $scope.error = data.message;
                });
        }
    });

})();