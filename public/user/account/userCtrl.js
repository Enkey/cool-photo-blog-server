angular.module('app').controller('userCtrl', ['$scope', 'userService', '$rootScope', 'mediator', 'fileUploadService',
    function ($scope, userService, $rootScope, mediator, fileUploadService) {

        mediator.$on('data:changed', function () {
            init();
        });

        function init() {
            if (userService.user) {
                $scope.user = userService.user;

                $scope.avatarUrl = $scope.user.avatar;

                if ($scope.avatarUrl == null) {
                    $scope.avatarUrl = "images/alien.png";
                }
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