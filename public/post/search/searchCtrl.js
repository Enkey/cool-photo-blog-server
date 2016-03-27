(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchCtrl', searchCtrl);

    searchCtrl.$inject = ['$scope', 'postService', '$routeParams'];
    function searchCtrl($scope, postService, $routeParams) {

        // при каждой загрузке контроллера - будет поиск
        doSearch();

        $scope.postsLoaded = postsLoaded;
        $scope.showModalDialog = showDialog;
        $scope.hideModalDialog = hideDialog;
        $scope.search = search;

        function postsLoaded() {
            var container = $('#gallery');
            container.imagesLoaded(function () {
                container.masonry({         // НЕ находит масонри!
                    itemSelector: ".item-masonry",
                    percentPosition: true
                });
            })
        }

        function showDialog(post) {
            $scope.post = post;
            showModalDialog();
        }

        function hideDialog($event, category) {
            hideModalDialog(function () {
                document.location.href = "/#post/category/" + category;
            });
            $event.preventDefault();
        }


        function search() {
            // переход на другую страницу. scope - обнуляется.
            // Будем брать данные из $routeParams
            document.location = '#/search/' + $scope.query;

        }

        function doSearch() {
            postService.search($routeParams.query).then(function (data) {
                if (data.data.length == 0) {
                    $scope.error = "No data";
                }
                $scope.posts = data.data;
            }).catch(function (err) {
                $scope.error = err;
            });
        }

    }

})();