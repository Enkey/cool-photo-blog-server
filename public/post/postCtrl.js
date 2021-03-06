(function () {
    'use strict';

    angular
        .module('app')
        .controller('postCtrl', postCtrl);


    postCtrl.$inject = ['$scope', 'postService'];


    function postCtrl($scope, postService) {


        $scope.postsLoaded = function () {
            var container = $('#gallery');
            container.imagesLoaded(function () {
                container.masonry({         // НЕ находит масонри!
                    itemSelector: ".item-masonry",
                    percentPosition: true
                });

            });
        };

        $scope.showModalDialog = function (post) {
            $scope.post = post;
            showModalDialog();
        };

        $scope.hideModalDialog = function ($event, category) {
            hideModalDialog(function () {
                document.location.href = "/#post/category/" + category;
            });
            $event.preventDefault();
        };


        postService
            .getPosts()
            .then(function (data) {
                $scope.posts = data.data;
                if ($scope.posts.length == 0) {
                    $scope.error = 'No data';
                }
                console.log('posts', $scope.posts);
            });
    }

})();