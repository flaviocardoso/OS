'use strict';

angular.module('app')

.controller('dashboardCtrl', function($scope, loginService, loginSessionService, ngProgressFactory, $timeout, $state, $window) {
    /*
    var prevScrpos = $window.pageYOffset;
    $window.onscroll = function () {
        var currScrpos = $window.pageYOffset;
        if (prevScrpos > currScrpos) {
            angular.element("#navmenu").css('visibility', 'visible');
            angular.element("#navmenu").css('z-index', '8');
            angular.element("#painelmenu").css('opacity', '0');
            angular.element("#bottonangleup").css('opacity', '0');
        } else {
            angular.element("#navmenu").css('visibility', 'visible');
    angular.element("#navmenu").css('z-index', '8');
    angular.element("#painelmenu").css('opacity', '0');
    angular.element("#bottonangleup").css('opacity', '0');
        }
        prevScrpos = currScrpos;
    }
    */
    $scope.logout = function() {
        loginService.logout();
    }

    var promise = loginSessionService.getUser(); // ver login session service
    promise.then (function (resp) {
        var str = resp.nome;
        if (str) {
            var nome = str.split(" ", 2);
            if (nome[1]) {
                $scope.dataNome = nome.join(" ");
            } else {
                $scope.dataNome = nome[0];
            }
        }
    });
    //$scope.dataNome = nome[0] + " " + nome[1];

    // posso usar isso para atualizar a lista !
    $scope.recarregar = function () {
        $state.reload(); // recarrega o dashboard - já exite um direcvite para isso
    }
    $scope.progressbar = ngProgressFactory.createInstance(); // criar uma barra de carragamento em cima do site em azul
    $scope.progressbar.start();
    $timeout(function() {
        $scope.progressbar.complete();
        $scope.show = true;
    }, 2000);
})