angular.module('app').service('postService', ['$http', '$q' , function($http, $q) {

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
}]);