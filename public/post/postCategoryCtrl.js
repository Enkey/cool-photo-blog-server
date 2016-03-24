angular.module('app')
    .controller('postCategoryCtrl', ['$scope', 'mediator', 'categoryService', 'postService', '$routeParams',
        function ($scope, mediator, categoryService, postService, $routeParams) {

            $scope.categories = categoryService.categories;
            mediator.$on('categories:loaded', function () {
                $scope.categories = categoryService.categories;
            });

            $scope.postsLoaded = function () {
                var container = $('#gallery');
                container.imagesLoaded(function () {
                    container.masonry({         // НЕ находит масонри!
                        itemSelector: ".item-masonry",
                        percentPosition: true
                    });

                })
            };

            postService.getPostsByCategory($routeParams.category).then(function (data) {
                if (data.data.length == 0) {
                    $scope.error = "No data";
                }
                $scope.posts = data.data;
            }).catch(function(err) {
                $scope.error = err;
            });


        }]);