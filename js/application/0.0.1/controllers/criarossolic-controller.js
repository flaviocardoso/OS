'use strict';

angular.module('app')

.controller('criarossolicCtrl', function($scope, CoordService, loginService, toaster, $timeout) {
    CoordService.getCoordSolic($scope);
    $scope.setorflag = 0;

    $scope.getNome = function (user) {
        if (user) {
           CoordService.getNome($scope, user); 
        }        
    };
    
    if ($scope.$parent.service.sol) {
        $scope.sol = $scope.$parent.service.sol;
    }
    if ($scope.$parent.service.sol_email) {
        $scope.sol_email = $scope.$parent.service.sol_email;
    }
    if ($scope.$parent.service.sol_coord) {
        $scope.sol_coord = $scope.$parent.service.sol_coord;
    }
    if ($scope.$parent.service.sol_setor) {
        $scope.setorflag = 1;
        var sleep = CoordService.getSetorbycoordSolic($scope.$parent.service.sol_coord, $scope);
        sleep.then (function (t) {
            $scope.sol_setor = $scope.$parent.service.sol_setor;
        });        
    }
    if ($scope.$parent.service.sol_ala) {
        $scope.sol_ala = $scope.$parent.service.sol_ala;
    }
    if ($scope.$parent.service.sol_sala) {
        $scope.sol_sala = $scope.$parent.service.sol_sala;
    }
    if ($scope.$parent.service.sol_ramal) {
        $scope.sol_ramal = $scope.$parent.service.sol_ramal;
    }

    $scope.changeCoord = function (coord) {

        if (coord) {
            var rs = CoordService.getSetorbycoordSolic(coord, $scope);
            rs.then (function (t) {
                if (t == 0) {
                    $scope.setorflag = 0;
                } else {
                    $scope.setorflag = 1;
                }
            })
        } else {
            $scope.setorflag = 0;
            $scope.solicitante.sol_setor = undefined;
            $scope.setordados = "";
        }
    }

    $scope.getUserSolic = function (user) {
        if  (user) {
            var promise = CoordService.loadSolic(user, $scope);
            promise.then (function (data) {
                if (data) {
                    console.log(data);
                    $scope.sol_coord = data['coord'];                    
                    if (data['setor']) {
                        $scope.setorflag = 1;
                        var sleep = CoordService.getSetorbycoordSolic(data['coord'], $scope);
                        sleep.then (function (t) {
                            $scope.sol_setor = data['setor'];
                        });                                                                                             
                    }                
                    $scope.sol_ala = data['ala'];
                    $scope.sol_sala = data['sala'];                    
                    $scope.sol_ramal = data['ramal'];
                }                
            });
        } else {
            toaster.pop("info", "", "Preencha o email com usuário do CBPF");
        }
    }

    $scope.verificarSolicitante = function (id, OS) {
        if (id) {
            var sol = CoordService.verSolicitante(id);
            sol.then (function (resp) {                      
                if (!resp.data.bool) {
                    CoordService.criarSolicitante(OS);
                }
            });
            
        }
        $scope.$parent.service.sol = $scope.sol;
        $scope.$parent.service.sol_email = $scope.sol_email;
        $scope.$parent.service.sol_coord = $scope.sol_coord;
        $scope.$parent.service.sol_setor = $scope.sol_setor ? $scope.sol_setor : "";
        $scope.$parent.service.sol_ala = $scope.sol_ala;
        $scope.$parent.service.sol_sala = $scope.sol_sala;
        $scope.$parent.service.sol_ramal = $scope.sol_ramal;
    }
})