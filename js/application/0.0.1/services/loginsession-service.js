'use strict';

angular.module('app')

.service("loginSessionService", function($http, $state, sessionService, toaster) {
    return {
        setSession: function($user, $uid, $scope, $rootScope) {
            $http.post("/app/session/app.php?s=user", { "user": $user, "uid": $uid }).then(function(resp) {
                
                var data = resp.data;
                var uid = data.uid;                 
                if (uid) {
                    sessionService.set('user', uid);
                    $state.go('dashboard.os');
                    toaster.pop('success', "", data.message, 10000, 'trustedHtml');
                } else {
                    toaster.pop('error', "", data.message, 10000, 'trustedHtml');
                }
            });
        },
        getUser: function() {
            return $http.post("/app/data/login_user.php").then (function (resp) {
                return resp.data;
            });
        }
    }
})