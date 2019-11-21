'use strict';

angular.module('app')

.controller('criartecCtrl', function ($scope, CoordService, toaster, $state) {
    CoordService.getCoord($scope);
    var subsetor = [];
    var area = [];
    $scope.getUser = function (user) {
        if (user) {
           CoordService.getUser($scope, user); 
        }        
    };

    $scope.toggleSubsetor = function (valor) {        
        var idx = subsetor.indexOf(valor);
        if (idx > -1) {
            subsetor.splice(idx, 1);
        }
        else {
            subsetor.push(valor);
        }
        $scope.tec.subsetor = subsetor;
        $scope.tec.area = ""; 
    }

    $scope.toggleArea = function (valor) {
        
        var idx = area.indexOf(valor);

        // Is currently selected
        if (idx > -1) {
            area.splice(idx, 1);
        }
        else {
            area.push(valor);
        }
        $scope.tec.area = area;
    }

    $scope.cleargrupo = function () {
        if ($scope.setorflag) {
            $scope.setorflag = 0;
        }
        if(angular.isDefined($scope.tec.coord)){
            $scope.tec.coord = undefined;
            $scope.coorddados = ""; 
        }
        if(angular.isDefined($scope.tec.setor)) {
            $scope.tec.setor = undefined;
            $scope.setordados = "";           
        }
        if(angular.isDefined($scope.tec.subsetor)) {
            $scope.tec.subsetor = undefined;
            $scope.subsetordados = "";
        }
        if(angular.isDefined($scope.tec.area)) {
            $scope.tec.area = undefined;
            $scope.areadados = "";            
        }
        CoordService.getCoord($scope);
    }

    $scope.clearcood = function () {
        if(angular.isDefined($scope.tec.setor)) {
            delete $scope.tec.setor;
            $scope.tec.setor.splice(0, $scope.tec.setor.lenght);
        }
        if(angular.isDefined($scope.tec.area)) {
            delete $scope.tec.area;
            $scope.tec.area.splice(0, $scope.tec.area.lenght);
        }
    }

    $scope.changeCoord = function (coord) {
        $scope.setorflag = 0;
        if (typeof $scope.tec.setor === 'string') {
            $scope.tec.setor = "";
            $scope.setordados = "";
        }
        if (typeof $scope.tec.subsetor === 'string') {
            $scope.tec.subsetor = "";
            $scope.subsetordados = "";
        }
        if ($scope.setorflag == 1) {
            $scope.setorflag = 0;
        }
        if (angular.isDefined($scope.tec.subsetor)) {
            if (typeof $scope.tec.subsetor === 'object') {
                if ($scope.tec.subsetor != null) {
                    if ($scope.tec.subsetor.length > 0) {
                        $scope.tec.subsetor.splice(0, $scope.tec.subsetor.length);
                        $scope.subsetordados = "";
                    }
                }
                
            }            
        }
        if (typeof $scope.tec.area === 'string') {
            $scope.tec.area = "";
            $scope.areadados = "";
        }
        if (angular.isDefined($scope.tec.area)) {
            if (typeof $scope.tec.area === 'object') {
                if ($scope.tec.area.length > 0) {
                    $scope.tec.area.splice(0, $scope.tec.area.length);
                    $scope.areadados = "";
                }
            }
        }
        $scope.tec.coord = coord;
        if (coord) {
            var returnsetores = CoordService.getSetorbycoord($scope.tec.coord, $scope);
            returnsetores.then (function (torsetor) {
                if (torsetor == 0) {
                    $scope.setorflag = 1;
                    $scope.setorinfoflag = 0;
                    CoordService.getSubSetorbysetor($scope.tec.coord, $scope);            
                } else {
                    $scope.setorflag = 0;
                    $scope.setorinfoflag = 1;
                }
            });
        } else {
            $scope.setorflag = 0;
            $scope.setorinfoflag = 0;
            $scope.tec.setor = undefined;
            $scope.setordados = "";
            $scope.tec.subsetor = undefined;
            $scope.subsetordados = "";
            $scope.tec.area = undefined;
            $scope.areadados = "";
        }
    }
    $scope.changeSetor = function (setor) {
        if ($scope.setorflag == 0) {
            $scope.setorflag = 1;
        }        
        
        if (angular.isDefined($scope.tec.subsetor)) {
            if (typeof $scope.tec.subsetor === 'object') {
                if ($scope.tec.subsetor != null) {
                    if ($scope.tec.subsetor.lenght > 0) {
                        $scope.tec.subsetor.splice(0, $scope.subsetor.lenght);
                        $scope.subsetordados = "";
                    }
                }
                
            }
        }
        
        if (angular.isDefined($scope.tec.area)) {
            if (typeof $scope.tec.area === 'object') {
                if ($scope.tec.area != null) {
                    if ($scope.tec.area.length > 0) {
                        $scope.tec.area.splice(0, $scope.tec.area.length);
                        $scope.areadados = "";
                    }
                }
            }
        }
        $scope.tec.setor = setor;
        if (setor) {
            CoordService.getSubSetorbysetor($scope.tec.setor, $scope);
            $scope.setorflag = 1;
        } else {
            $scope.setorflag = 0;
            $scope.tec.subsetor = undefined;
            $scope.subsetordados = "";
            $scope.tec.area = undefined;
            $scope.areadados = "";
        }        
    }

    $scope.changeSubSetor = function (subsetor) {
        if (angular.isDefined($scope.tec.area)) {
            if (typeof $scope.tec.area === 'object') {
                if ($scope.tec.area != null) {
                    if ($scope.tec.area.length > 0) {
                        $scope.tec.area.splice(0, $scope.tec.area.length);
                        $scope.areadados = "";
                    }
                }
                
            }
        }

        $scope.tec.subsetor = subsetor;
        if (subsetor) {
           CoordService.getAreabysubsetor($scope.tec.subsetor, $scope);
            if (typeof $scope.tec.area === 'string') {
                $scope.tec.area = "";
                $scope.areadados = "";
            } 
        } else {
            $scope.areadados = "";
            $scope.tec.area = "";
        }        
    }

    $scope.criarUser = function () {
      var flag = true;
      if ($scope.tec) {
        if ($scope.tec.user) {}
        else {
          toaster.pop('warning', "", "preencha o campo de user!", 3000, 'trustedHtml');
          flag = false;
        }
        if ($scope.tec.nome) {}
        else {
          toaster.pop('warning', "", "preencha o campo do nome!", 3000, 'trustedHtml');
          flag = false;
        }
        if ($scope.tec.ramal) {}
        else {
          toaster.pop('warning', "", "preencha o campo do ramal!", 3000, 'trustedHtml');
          flag = false;
        }        
        if ($scope.tec.coord) {}
        else {
            toaster.pop('warning', "","preencha o campo da coordenação!", 3000, 'trustedHtml');
            flag = false;
        }

        switch ($scope.tec.grupo) {
            case 'tec':
                if ($scope.tec.subsetor) {}
                else {
                    toaster.pop('warning', "","preencha o campo do subsetor-2!", 3000, 'trustedHtml');
                    flag = false;
                }
                if ($scope.tec.area) {}
                else {
                    toaster.pop('warning', "","preencha o campo da area!", 3000, 'trustedHtml');
                    flag = false;
                }
                break;
            case 'resp':
                if ($scope.tec.subsetor) {}
                else {
                    console.log($scope.tec.subsetor);
                    
                toaster.pop('warning', "","preencha o campo do subsetor-1!", 3000, 'trustedHtml');
                flag = false;
                }
                break;
            case 'admin':
            case 'secr':
            case 'sol':
                break;
            default:
                toaster.pop('warning', "","preencha o campo do subsetor!-3", 3000, 'trustedHtml');
                flag = false;
        }
        
        if (flag) {
          CoordService.criarUser($scope.tec);
          $state.go("dashboard.os");
        }
      } else {
        toaster.pop('warning', "", "preencha os campos", 3000, 'trustedHtml');
      }

    }

    $scope.criarInfo = function (lista) {
        var flag = true;
        if ($scope.tec) {
          if ($scope.tec.user) {}
          else {
            toaster.pop('warning', "", "preencha o campo de user!", 3000, 'trustedHtml');
            flag = false;
          }
          if ($scope.tec.nome) {}
          else {
            toaster.pop('warning', "", "preencha o campo do nome!", 3000, 'trustedHtml');
            flag = false;
          }
          if ($scope.tec.ramal) {}
          else {
            toaster.pop('warning', "", "preencha o campo do ramal!", 3000, 'trustedHtml');
            flag = false;
          }
          if ($scope.tec.coord) {}
          else {
            toaster.pop('warning', "","preencha o campo da coordenação!", 3000, 'trustedHtml');
            flag = false;
          }          
          if (flag) {
            CoordService.criarInfo(lista);
            $state.go("dashboard.os");
          }
        } else {
          toaster.pop('warning', "", "preencha os campos", 3000, 'trustedHtml');
        }
  
      }

    $scope.criarGrupo = function (lista) {
        var flag = true;
        if ($scope.tec) {
          if ($scope.tec.user) {}
          else {
            toaster.pop('warning', "", "preencha o campo de user!", 3000, 'trustedHtml');
            flag = false;
          }          
          
          if ($scope.tec.grupo) {
              if ($scope.tec.coord) {
                  switch ($scope.tec.grupo) {
                    case 'tec':
                        if ($scope.tec.subsetor) {}
                        else {
                        toaster.pop('warning', "","preencha o campo do subsetor!", 3000, 'trustedHtml');
                        flag = false;
                        }
                        if ($scope.tec.area) {}
                        else {
                        toaster.pop('warning', "","preencha o campo da area!", 3000, 'trustedHtml');
                        flag = false;
                        }
                    break;
                    case 'resp':
                    if ($scope.tec.subsetor) {}
                    else {
                        toaster.pop('warning', "","preencha o campo do subsetor!", 3000, 'trustedHtml');
                        flag = false;
                    }
                    break;
        
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
            CoordService.criarGrupo($scope.tec);
            $state.go("dashboard.os");
          }
        } else {
          toaster.pop('warning', "", "preencha os campos", 3000, 'trustedHtml');
        }
  
      }
})