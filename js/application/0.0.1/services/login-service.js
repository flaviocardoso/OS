'use strict';

angular.module('app')

.factory('loginService', function($http, $state, $window, $location, sessionService, loginSessionService, toaster) {
    return {
        login: function(user, $scope, $rootScope) {
            $http({
                    method: 'POST',
                    url: '/app/acesso/login.php',
                    data: user
                })
                .then(function(res) {
                    //console.log(res);
                    var uid = res.data.user; // user angular
                    if (uid) {
                        loginSessionService.setSession(user['username'], uid, $scope, $rootScope);
                    } else {
                        $scope.user.username = "";
                        $scope.user.password = "";
                        toaster.pop('error', "", res.data.message, 10000, 'trustedHtml');
                    }
                })
        },
        logout: function() {
            sessionService.destroy('user');
            $http.get('/app/acesso/logout.php');
            $window.location.href = "/";
        },
        islogged: function() {
            var checkSession = $http.post('/app/acesso/session.php');
            return checkSession;
        }
    }
})