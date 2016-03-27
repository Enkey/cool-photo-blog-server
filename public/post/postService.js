(function () {
    'use strict';

    angular
        .module('app')
        .service('postService', postService);

    postService.$inject = ['$http', '$q', '$rootScope'];
    function postService($http, $q, $rootScope) {

        this.search = search;
        this.addPost = addPost;
        this.getPostsByCategory = getPostsByCategory;
        this.getPosts = getPosts;

        function search(query) {

            return $http
                .get('posts/search?q=' + query)
                .then(function (res) {
                    if (res.data.success === true) {
                        return res.data;
                    }
                    else {
                        return $q.reject(res.data);
                    }
                });
        }

        function addPost(title, description, image_id, category_id) {
            return $http
                .post('posts/add', {
                    title: title,
                    description: description,
                    image_id: image_id,
                    category_id: category_id
                })
                .then(function (res) {
                    if (res.data.success === true) {
                        return res.data;
                    }
                    else {
                        return $q.reject(res.data);
                    }
                });
        }

        function getPostsByCategory(category) {

            var category_id = null;
            $rootScope.globals.categories.forEach(function (item) {
                if (item.title.toLowerCase() == category.toLowerCase()) {
                    category_id = item.id;
                }
            });

            if (category_id == null) {
                return $q.reject("No category: " + category);
            }

            return $http
                .get('posts/category/' + category_id)
                .then(function (res) {
                    if (res.data.success === true) {
                        return res.data;
                    }
                    else {
                        return $q.reject(res.data);
                    }
                });
        }

        function getPosts() {
            return $http
                .get('posts/')
                .then(function (res) {
                    if (res.data.success === true) {
                        return res.data;
                    }
                    else {
                        return $q.reject(res.data);
                    }
                });
        }

    }

})();


