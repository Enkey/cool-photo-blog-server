(function () {
    'use strict';

    angular
        .module('app')
        .controller('postAddCtrl', postCtrl);


    postCtrl.$inject = ['$scope', 'fileUploadService', 'postService'];
    function postCtrl($scope, fileUploadService, postService) {


        $scope.addPost = addPost;

        function addPost() {

            if (!$scope.title || $scope.title.trim().length == 0 || !$scope.description
                || $scope.description.trim().length == 0 || !$scope.file || !$scope.category) {
                $scope.error = "Fill all fields";
                return;
            }

            var file = $scope.file;
            var uploadUrl = '/file/upload';

            fileUploadService
                .uploadFileToUrl(file, uploadUrl)
                .then(function (data) {
                    postService
                        .addPost(
                            $scope.title,
                            $scope.description,
                            data.image.id,
                            $scope.category.id
                        )
                        .then(function () {
                            document.location.href = "/#/";
                        })
                        .catch(function (data) {
                            $scope.error = data.message;
                        });
                })
                .catch(function (data) {
                    $scope.error = data.message;
                });
        };


    }


})();