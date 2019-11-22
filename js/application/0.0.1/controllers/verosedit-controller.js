'use strict';

angular.module('app')

.controller('verOseditCtrl', function ($scope, $state, CoordService, toaster) {
    var input = document.getElementById("inputfile");
    $scope.buttonShow = true;
    input.onchange = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files;
        $scope.$apply(function () {
            $scope.files = [];
            $scope.files.push(files[0]);
            $scope.progressVisible = false;
        });
    }
    $scope.editarOS = function (editOs) {
        $scope.buttonShow = false;
        if ($scope.buttonbox) {
            var promise = CoordService.enviarFile($scope);
            promise.then(function(resp) {
                if (resp) {
                    if (resp == "erro") {
                        toaster.pop('info', "Informação:", "Não é possivel enviar o arquivo no momento, por favor tente denovo!", 10000, 'trustedHtml');
                    }
                    else {
                        editOs.file = resp;
                        CoordService.editOsNova(editOs);
                        $state.go("dashboard.os.ver.os");
                    }
                } else {
                    toaster.pop('error', "Erro ao enviar arquivo. Arquivo não enviado!", 10000, 'trustedHtml');
                }
            });
        } else {
            CoordService.editOsNova(editOs);
            $state.go("dashboard.os.ver.os");
        }
    }
    $scope.limitCharTopic = function (str) {
        if (str.length == 80) {
            toaster.pop("info", "Informação:", "Limite de 80 caracters para o tópico de Descrição", 10000, 'trustedHtml');
        }
    }
    $scope.limitCharDescr = function (str) {
        if (str.length == 350) {
            toaster.pop("info", "Informação:", "Limite de 350 caracters para a Descrição", 10000, 'trustedHtml');
        }
    }
})