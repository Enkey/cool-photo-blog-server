angular.module('app')
    .controller('searchCtrl', ['$scope', 'postService', '$routeParams',
        function ($scope, postService, $routeParams) {

            $scope.postsLoaded = function () {
                var container = $('#gallery');
                container.imagesLoaded(function () {
                    container.masonry({         // НЕ находит масонри!
                        itemSelector: ".item-masonry",
                        percentPosition: true
                    });

                })
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


            $scope.search = function () {
                // переход на другую страницу. scope - теряется.
                // Будем брать данные из $routeParams
                document.location = '#/search/' + $scope.query;

            };

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

            // при каждой загрузке контроллера - будет поиск
            doSearch();

        }]);