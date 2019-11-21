'use strict';

angular.module('app')

.controller('verOsidCtrl', function ($scope, $window, $state, $stateParams, CoordService) {
    var origin = window.location.origin;
    $scope.recarregar = function () {
        $state.reload($state.current);
    }

    $scope.linkFile = function (file) { 
        location.assign(origin + '/app/data/app.php?d=downloadFile&file=' + file); // verifica o nome do arquivo
    }
})