angular.module('app')
    .controller('postCtrl', ['$scope', 'fileUploadService', 'mediator', 'userService', 'categoryService', 'postService',
        function ($scope, fileUploadService, mediator, userService, categoryService, postService) {

            $scope.categories = categoryService.categories;
            mediator.$on('categories:loaded', function () {
                $scope.categories = categoryService.categories;
            });


            mediator.$on('data:changed', function () {
                if (userService.user) {
                    $scope.username = userService.user.username;
                }
            });

            if (userService.user) {
                $scope.username = userService.user.username;
            }

            $scope.postsLoaded = function () {
                var container = $('#gallery');
                container.imagesLoaded(function () {
                    container.masonry({         // НЕ находит масонри!
                        itemSelector: ".item-masonry",
                        percentPosition: true
                    });

                });
            };

            $scope.showModalDialog = function(post) {
                $scope.post = post;
                $('#myModal').modal('show');
            };


            postService.getPosts().then(function (data) {
                $scope.posts = data.data;
            });


            $scope.addPost = function () {

                if (!$scope.title || $scope.title.trim().length == 0 || !$scope.description || $scope.description.trim().length == 0 || !$scope.file || !$scope.category) {
                    $scope.error = "Fill all fields";
                    return;
                }

                var file = $scope.file;
                var uploadUrl = '/file/upload';

                fileUploadService.uploadFileToUrl(file, uploadUrl)
                    .then(function (data) {
                        postService.addPost(
                            $scope.title,
                            $scope.description,
                            data.image.id,
                            $scope.category.id)
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


        }]);
