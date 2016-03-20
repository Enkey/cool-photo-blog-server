angular.module('app')
    .controller('postCtrl', ['$scope', 'fileUploadService', function ($scope, fileUploadService) {
        $scope.addPost = function () {
            var file = $scope.file;
            var uploadUrl = '/file/upload';

            fileUploadService.uploadFileToUrl(file, uploadUrl);

        };


    }]);