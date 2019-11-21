'use strict';

angular.module('app')

.controller("loginCtrl", function($rootScope, $scope, $state, $http, $location, $timeout, ngProgressFactory, loginService) { // mofificar depois
    $scope.location = $location.path();

    $scope.login = function(user) {
        loginService.login(user, $scope, $rootScope);
    }

    $scope.clearMsg = function() {
        $scope.errorLogin = false;
    }
})