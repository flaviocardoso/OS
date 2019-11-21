'use strict';

angular.module('app')

.controller('sobreCtrl', function($rootScope, $location) {
    $rootScope.activetab = $location.path();
    $rootScope.menu = true;
    $rootScope.location = $location;
})