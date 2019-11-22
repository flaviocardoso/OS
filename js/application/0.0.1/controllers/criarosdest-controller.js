'use strict';

angular.module('app')

.controller('criarosdestCtrl', function($scope, CoordService) {
    // controle de destino para criação da ordem de serviço
    $scope.flagsetor = 0;
    $scope.flagsubsetor = 0;
    $scope.flagarea = 0;
    $scope.flagservice = 0;
    CoordService.getCoord($scope);
    // getCoord(), getSetorbycoord(coord), getSubSetorbysetor(setor), getAreabysubsetor(subsetor), getServicebyarea(subsetor, area)
    if ($scope.$parent.service.dest_coord) {
        $scope.destcoord = $scope.$parent.service.dest_coord;
        var promise = CoordService.getSetorbycoord($scope.$parent.service.dest_coord, $scope); // puxa setores
        promise.then (function (t) {
            if (t == 0) {
                $scope.flagsetor = 0;
                $scope.flagsubsetor = 1;
                CoordService.getSubSetorbysetor($scope.$parent.service.dest_coord, $scope);
            } else {
                $scope.flagsetor = 1;
                $scope.flagsubsetor = 0;
            }
        });
    }

    if ($scope.$parent.service.dest_setor) {
        $scope.flagsetor = 1;
        $scope.destsetor = $scope.$parent.service.dest_setor;
        CoordService.getSubSetorbysetor($scope.$parent.service.dest_setor, $scope); 
    }
    if ($scope.$parent.service.dest_subsetor) {
        $scope.flagarea = 1;
        $scope.destsubsetor = $scope.$parent.service.dest_subsetor;
        CoordService.getAreabysubsetor($scope.$parent.service.dest_subsetor, $scope); 
    }

    if ($scope.$parent.service.dest_area) {
        $scope.flagservice = 1;
        $scope.destarea = $scope.$parent.service.dest_area;
        CoordService.getServicebyarea($scope.$parent.service.dest_subsetor, $scope.$parent.service.dest_area, $scope); // puxa areas
    }

    if ($scope.$parent.service.dest_service) {
        $scope.destservice = $scope.$parent.service.dest_service;
    }

    $scope.setorByCoord = function(coord) {
        $scope.flagservice = 0;
        $scope.flagarea = 0;
        $scope.destarea = undefined; // limpa campo de area
        $scope.destservice = undefined;
        if (!coord) { // verifica se coordenação selecionada está vazia
            $scope.flagsetor = 0;
            $scope.flagsubsetor = 0;
            $scope.destsetor = undefined;
            $scope.setordados = "";
            $scope.destsubsetor = undefined;
            $scope.subsetordados = "";           
        } else {
            $scope.destcoord = coord;         
            var promise2 = CoordService.getSetorbycoord(coord, $scope); // puxa setores
            promise2.then (function (t2) {
                if (t2 == 0) {
                    $scope.flagsetor = 0;
                    $scope.destsetor = "";
                    $scope.setordados = "";
                    $scope.flagsubsetor = 1;
                    CoordService.getSubSetorbysetor(coord, $scope);
                } else {
                    $scope.flagsetor = 1;
                    $scope.flagsubsetor = 0;                    
                    $scope.subsetordados = "";
                }
            });
        }
        
    }

    $scope.subsetorBySetor = function (setor) {
        $scope.flagservice = 0;
        $scope.flagarea = 0;
        $scope.destarea = undefined; // limpa campo de area
        $scope.destservice = undefined;
        if (!setor) {
            $scope.flagsubsetor = 0;
            $scope.destsetor = "";
            $scope.destsubsetor = undefined;
            $scope.subsetordados = "";
        } else {
            $scope.flagsubsetor = 1;
            $scope.destsetor = setor;
            CoordService.getSubSetorbysetor(setor, $scope);
        }
    }

    $scope.areaBySubsetor = function(subsetor) { 
        $scope.flagservice = 0;
        $scope.destservice = undefined;
        if (!subsetor) {            
            $scope.flagarea = 0;           
            $scope.destarea = undefined;            
        } else {
            $scope.flagarea = 1;
            $scope.destsubsetor = subsetor;
            console.log($scope.destsubsetor);
            CoordService.getAreabysubsetor(subsetor, $scope);
        }
        
    }

    $scope.serviceByArea = function(area) { // função para encontrar areas pelo setor seleciondo
        if (!area) { 
            $scope.flagservice = 0;
            $scope.destservice = undefined;          
        } else {
            $scope.flagservice = 1;
            console.log($scope.destsubsetor);
            console.log($scope.destarea);
            $scope.destarea = area; // mostra serviços 
            CoordService.getServicebyarea($scope.destsubsetor, $scope.destarea, $scope); 
        }
    }

    $scope.showFrasesFixas = function (service) { // area e servive para banco 07/07
        $scope.destservice = service;
        if (service == "Verificar Ponto de Rede") {
            $scope.$parent.service.descr = "Número de ponto de rede: ";
        } else {
            $scope.$parent.service.descr = "";
        }
    }

    $scope.guardacopia = function () {
        $scope.$parent.service.dest_coord = $scope.destcoord;
        $scope.$parent.service.dest_setor = $scope.destsetor;
        $scope.$parent.service.dest_subsetor = $scope.destsubsetor;
        $scope.$parent.service.dest_area = $scope.destarea;
        $scope.$parent.service.dest_service = $scope.destservice;
    }
})