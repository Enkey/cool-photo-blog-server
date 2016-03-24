angular.module('app').service('postService', ['$http', '$q', 'categoryService', function($http, $q, categoryService) {

    this.addPost = function (title, description, image_id, category_id) {
        return $http({
            method: 'POST',
            url: 'posts/add',
            data: {
                title: title,
                description: description,
                image_id: image_id,
                category_id: category_id
            }
        }).then(function (response) {
            if (response.data.success === true) {
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }
        });
    };

    this.getPostsByCategory = function (category) {

        var category_id = null;
        categoryService.categories.forEach(function (item) {
            if (item.title.toLowerCase() == category.toLowerCase()) {
                category_id = item.id;
            }
        });

        if (category_id == null) {
            return $q.reject("No category: " + category);
        }

        return $http({
            method: 'GET',
            url: 'posts/category/' + category_id
        }).then(function (response) {
            if (response.data.success === true) {
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }
        });
    };

    this.getPosts = function () {
        return $http({
            method: 'GET',
            url: 'posts/'
        }).then(function (response) {
            if (response.data.success === true) {
                return response.data;
            }
            else {
                return $q.reject(response.data);
            }
        });
    };

}]);