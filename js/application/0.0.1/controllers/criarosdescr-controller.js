'use strict';

angular.module('app')

.controller('criarosdescrCtrl', function($scope, toaster) {

    var inputfile = document.getElementById("inputfile"); // pega o id do arquivo para upload

    $scope.$parent.buttonShow = true;

    inputfile.onchange = function (e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.target.files;
        $scope.$apply(function () { // carrega o aquivo em uma variável
            $scope.$parent.files = [];
            $scope.$parent.files.push(files[0]);
            $scope.$parent.progressVisible = false;
        });
    }

    $scope.limitCharDescr = function (str) { // verifica o descrição e laudo comprimento da frase por caracter
        if (str.length == 350) {
            toaster.pop("info", "Informação:", "Limite de 350 caracters para a Descrição", 10000, 'trustedHtml');
        }
    }
})