'use strict';

angular.module('app')

.controller('contatoCtrl', function($rootScope, $location) {
    $rootScope.activetab = $location.path();
    $rootScope.menu = true;
    $rootScope.location = $location;
})