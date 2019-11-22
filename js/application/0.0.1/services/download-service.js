'use strict';

angular.module('app')

.service('Download', function ($http) {
    return {
        getFile : function (path) {
            $http.post("/app/data/download.php", {'path' : path});
        }
    }
})