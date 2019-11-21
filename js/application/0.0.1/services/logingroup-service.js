'use strict';

angular.module('app')

.service('loginGroup', function($q, $http) {
    this.role = null;
    var resolve = null;
    var that = this;
    this.group = function () {
        if (resolve == null) {
            resolve = $q.defer();
            $http.post("/app/data/session_group.php").then (function (resp) {
                if (resp.data) {
                    resolve.resolve(resp.data);
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
                
            });
        }
        return resolve.promise;
    }
})