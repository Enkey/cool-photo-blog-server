angular.module('app')
    .controller('postCtrl', ['$scope', 'fileUploadService', 'mediator', 'userService',
        function ($scope, fileUploadService, mediator, userService) {


        mediator.$on('data:changed', function () {
            init();
        });

        function init() {
            if (userService.user) {
                $scope.username = userService.user.username;
            }
        }

        init();



        $scope.addPost = function () {
            var file = $scope.file;
            var uploadUrl = '/file/upload';

            fileUploadService.uploadFileToUrl(file, uploadUrl);

        };


    }]);