angular.module('app').controller('userCtrl', ['$scope', 'userService', '$rootScope', 'mediator',
    'fileUploadService', 'locationService',
    function ($scope, userService, $rootScope, mediator, fileUploadService, locationService) {

        mediator.$on('data:changed', function () {
            init();
            locationService.restoreLocation();
        });

        function init() {
            if (userService.user) {
                $scope.user = userService.user;

                $scope.avatarUrl = $scope.user.avatar;

                if ($scope.avatarUrl == null) {
                    $scope.avatarUrl = "images/alien.png";
                }
            }
            else {
                locationService.changeLocation('#/user' ,'#/signin');
            }
        }

        init();

        $scope.edit = function () {

            var file = $scope.file;
            var uploadUrl = '/file/upload';

            fileUploadService.uploadFileToUrl(file, uploadUrl)
                .then(function (data) {

                    userService.setAvatar(data.image.id)
                        .then(function (data) {
                            userService.user = data.user;
                            mediator.$emit('data:changed');
                            $scope.error = "";
                        })
                        .catch(function (data) {
                            $scope.error = data.message;
                        });
                })
                .catch(function (data) {
                    $scope.error = data.message;
                });
        }

    }]);