'use strict';

angular.module('app')

.controller('editetecCtrl', function ($scope, CoordService, $state) {
    CoordService.getCoord($scope);

    $scope.cleargrupo = function () {
        if ($scope.setorflag) {
            $scope.setorflag = 0;
        }
        if(typeof $scope.coord == 'string') {
            $scope.coord = undefined;
            $scope.coorddados = "";                      
        }
        if(typeof $scope.setor == 'string') {
            $scope.setor = undefined;
            $scope.setordados = "";           
        }
        if(typeof $scope.subsetor == 'string') {
            $scope.subsetor = undefined;
            $scope.subsetordados = "";          
        }
        if(typeof $scope.area == 'string') {
            $scope.area = undefined;
            $scope.areadados = "";                  
        }
        CoordService.getCoord($scope);
    }

    $scope.setorflag = 0;
    var subsetor = [];
    var area = [];

    $scope.toggleSubSetor = function (valor) {        
        var idx = subsetor.indexOf(valor);
        if (idx > -1) {
            subsetor.splice(idx, 1);
        }
        else {
            subsetor.push(valor);
        }
        $scope.subsetor = subsetor;
        $scope.area = ""; 
    }

    $scope.toggleArea = function (valor) {        
        var idx = area.indexOf(valor);
        if (idx > -1) {
            area.splice(idx, 1);
        }
        else {
            area.push(valor);
        }
        $scope.area = area;
    }

    $scope.changeCoord = function (coord) {
        $scope.setorflag = 0;
        if (typeof $scope.setor === 'string') {
            $scope.setor = "";
            $scope.setordados = "";
        }
        if (typeof $scope.subsetor === 'string') {
            $scope.subsetor = "";
            $scope.subsetordados = "";
        }
        if ($scope.setorflag == 1) {
            $scope.setorflag = 0;
        }
        if (angular.isDefined($scope.subsetor)) {
            if (typeof $scope.subsetor === 'object') {
                if ($scope.subsetor != null) {
                    if ($scope.subsetor.length > 0) {
                        $scope.subsetor.splice(0, $scope.subsetor.length);
                        $scope.subsetordados = "";
                    }
                }
                
            }            
        }
        if (typeof $scope.area === 'string') {
            $scope.area = "";
            $scope.areadados = "";
        }
        if (angular.isDefined($scope.area)) {
            if (typeof $scope.area === 'object') {
                if ($scope.area.length > 0) {
                    $scope.area.splice(0, $scope.area.length);
                    $scope.areadados = "";
                }
            }
        }
        $scope.coord = coord;
        if (coord) {
            var returnsetores = CoordService.getSetorbycoord($scope.coord, $scope);
            returnsetores.then (function (torsetor) {
                if (torsetor == 0) {
                    $scope.setorflag = 1;
                    CoordService.getSubSetorbysetor($scope.coord, $scope);            
                } else {
                    $scope.setorflag = 0;
                }
            });
        } else {
            $scope.setorflag = 0;
            $scope.setor = undefined;
            $scope.setordados = "";
            $scope.subsetor = undefined;
            $scope.subsetordados = "";
            $scope.area = undefined;
            $scope.areadados = "";
        }
        // $scope.valorsetores;
         
    }
    $scope.changeSetor = function (setor) {
        if ($scope.setorflag == 0) {
            $scope.setorflag = 1;
        }        
        
        if (angular.isDefined($scope.subsetor)) {
            if (typeof $scope.subsetor === 'object') {
                if ($scope.subsetor != null) {
                    if ($scope.subsetor.lenght > 0) {
                        $scope.subsetor.splice(0, $scope.subsetor.lenght);
                        $scope.subsetordados = "";
                    }
                }
                
            }
        }
        
        if (angular.isDefined($scope.area)) {
            if (typeof $scope.area === 'object') {
                if ($scope.area != null) {
                    if ($scope.area.length > 0) {
                        $scope.area.splice(0, $scope.area.length);
                        $scope.areadados = "";
                    }
                }
            }
        }
        $scope.setor = setor;
        if (setor) {
            CoordService.getSubSetorbysetor($scope.setor, $scope);
            $scope.setorflag = 1;
        } else {
            $scope.setorflag = 0;
            $scope.subsetor = undefined;
            $scope.subsetordados = "";
            $scope.area = undefined;
            $scope.areadados = "";
        }    
    }
    $scope.changeSubSetor = function (subsetor) {
        if (angular.isDefined($scope.area)) {
            if (typeof $scope.area === 'object') {
                if ($scope.area != null) {
                    if ($scope.area.length > 0) {
                        $scope.area.splice(0, $scope.area.length);
                        $scope.areadados = "";
                    }
                }
                
            }
        }

        $scope.subsetor = subsetor;
        if (subsetor) {
           CoordService.getAreabysubsetor($scope.subsetor, $scope);
            if (typeof $scope.area === 'string') {
                $scope.area = "";
                $scope.areadados = "";
            } 
        } else {
            $scope.areadados = "";
            $scope.area = "";
        }
        
        
        
    }
    $scope.changeArea = function (area) {
        $scope.area = area;
    }
    $scope.copy = function () {
        $scope.user = $scope.$ctrl.tecid.user;
        $scope.nome = $scope.$ctrl.tecid.nome;
        $scope.ala = $scope.$ctrl.tecid.ala;
        $scope.sala = $scope.$ctrl.tecid.sala;
        $scope.ramal = $scope.$ctrl.tecid.ramal;
    }

    $scope.editeUserInfo = function (lista) {
        var flag = true;
        if ($scope.user) {}
        else {
          alert("preencha o campo de user!");
          flag = false;
        }
        if ($scope.nome) {}
        else {
          alert("preencha o campo do nome!");
          flag = false;
        }
        if ($scope.ramal) {}
        else {
          alert("preencha o campo do ramal!");
          flag = false;
        }

        if (flag) {
            CoordService.editeUserInfo({
                'user': $scope.user,
                'nome': $scope.nome,
                'ramal': $scope.ramal,
                'ala': $scope.ala,
                'sala': $scope.sala 
              });
        }
    };

    $scope.ativarNivel = function (lista) {
        CoordService.ativarNivel(lista);
    }

    $scope.desativarNivel = function (lista) {
        CoordService.desativarNivel(lista);
    }

    $scope.editeUserGrupo = function (lista) {
        var flag = true;
        if ($scope.coord) {}
        else {
          alert("preencha o campo da coordenação!");
          flag = false;
        }
        if ($scope.grupo) {
            if ($scope.coord) {
                switch ($scope.grupo) {
                    case 'tec':
                        if ($scope.subsetor) {}
                        else {
                            alert("preencha o campo do setor!");
                            flag = false;
                        }
                        if ($scope.area) {}
                        else {
                            alert("preencha o campo da area!");
                            flag = false;
                        }
                        break;
                    case 'resp':
                        if ($scope.subsetor) {
                            $scope.area = "";
                        }
                        else {
                        alert("preencha o campo do setor!");
                        flag = false;
                        }
                        break;
                    default:
                        $scope.subsetor = "";
                        $scope.area = "";
                }
            }
            else {
                toaster.pop('warning', "","preencha o campo da coordenação!", 3000, 'trustedHtml');
                flag = false;
            }
        }
        else {
            toaster.pop('warning', "","preencha o campo do tipo de Usuário!", 3000, 'trustedHtml');
            flag = false;
        }
        
        if (flag) {
          CoordService.editeUserGrupo({
            'user': $scope.user, 
            'grupo': $scope.grupo, 
            'coord': $scope.coord, 
            'setor': $scope.setor,
            'subsetor': $scope.subsetor, 
            'area': $scope.area  
          });
        }
    };

    $scope.editeUser = function(lista) {
        var flag = true;
        if ($scope.user) {}
        else {
          alert("preencha o campo de user!");
          flag = false;
        }
        if ($scope.nome) {}
        else {
          alert("preencha o campo do nome!");
          flag = false;
        }
        if ($scope.ramal) {}
        else {
          alert("preencha o campo do ramal!");
          flag = false;
        }        
        if ($scope.grupo) {
            if ($scope.coord) {
                switch ($scope.grupo) {
                    case 'tec':
                        if ($scope.subsetor) {}
                        else {
                            alert("preencha o campo do setor!");
                            flag = false;
                        }
                        if ($scope.area) {}
                        else {
                            alert("preencha o campo da area!");
                            flag = false;
                        }
                        break;
                    case 'resp':
                        if ($scope.subsetor) {
                            $scope.area = "";
                        }
                        else {
                        alert("preencha o campo do setor!");
                        flag = false;
                        }
                        break;
                    default:
                        $scope.subsetor = "";
                        $scope.area = "";
        }} else {
            alert("preencha o campo da coordenação!");
            flag = false;
            }
        }
        
        if (flag) {
          console.log({
            'user': $scope.user, 
            'grupo': $scope.grupo, 
            'coord': $scope.coord, 
            'setor': $scope.setor,
            'subsetor': $scope.subsetor, 
            'area': $scope.area  
          });
          CoordService.editeUser({
            'user': $scope.user,
            'nome': $scope.nome,
            'ramal': $scope.ramal,
            'ala': $scope.ala,
            'sala': $scope.sala,            
            'grupo': $scope.grupo, 
            'coord': $scope.coord, 
            'setor': $scope.setor,
            'subsetor': $scope.subsetor, 
            'area': $scope.area  
          });
        }
    }
})