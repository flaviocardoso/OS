'use strict';

angular.module('app')

.controller('osCtrl', function($rootScope, $scope, $location, $timeout, loginService, ngProgressFactory) {
    $scope.logout = function() {
        loginService.logout();
    }
})