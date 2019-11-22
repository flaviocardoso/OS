// diretivas
'use strict';

angular.module('app')
.directive("anchorScroll", function ($state, $anchorScroll) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function (e) {
                e.preventDefault();
                $state.go($state.current).then (function () {$anchorScroll("bodyprincipal");});
            })
        }
    }
})
.directive("sideBar", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.mCustomScrollbar({
                theme: "minimal"
            });
        }
    }
})
.directive("removeClassMenu", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                angular.element('#sidebar').removeClass('active');
                angular.element('.overlay').removeClass('active');
            });
        }
    }
})
.directive("sidebarCollapse", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function (e) {
                e.preventDefault();
                angular.element('#sidebar').addClass('active');
                angular.element('.overlay').addClass('active');
                angular.element('.collapse.in').toggleClass('in');
                angular.element('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        }
    }
})
.directive("fileModel", function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
})
.directive("popOver", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var options;
            options = {
                title: "Informação",
                content: attrs.content,
                trigger: attrs.trigger,
                placement: attrs.placement,
                html: true,
                animation: true
            }
            element.popover(options);
        }
    }
})
.directive("popOverUser", function () {
    return {
        restrict: 'A',
        replace: true,
        scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
        templateUrl: "/app/views/popover-html-unsafe-popup.html"
    }
})
.directive("cardFlip", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on("click", function (e) {
                e.preventDefault();
                angular.element(".card").toggleClass('flipped');
            });
        }
    }

})
.directive("fileDownload", function ($parse) {
    return {
        restrict: 'A',
        scope: {
            fileDownload: '='
        },
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
                e.preventDefault();
                scope.$apply(function() {
                    window.open(window.location.origin + "/app/data/app.php?d=downloadFile&file=" + scope.fileDownload, '_blank');
                });
            });
        }
    }
})
.directive('ngGetOrdem', function () {
    return {
        restrict: 'A',
        scope: {
            ngGetOrdem: '='
        },
        link: function (scope, element, attrs) {
            scope.volta = "";
        }
    }
})
.directive('ngCoordsetorsolic', function (CoordService) {
    return {
        link: function(scope, element, attrs) {
            CoordService.getCoordSolic(scope);
            scope.$watch("seach.sol_coord", function () {
                if (scope.seach != undefined) CoordService.getSetorbycoordSolic(scope.seach.sol_coord, scope);
            });
        }
    }
})
.directive('ngSetorsolic', function (CoordService) { // não funcional
    return {
        link: function(scope, element, attrs) {
            CoordService.getSetorbycoordSolic(scope);
        }
    }
})
.directive('ngCoordAdmin', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getCoord(scope);
        }
    }
})
.directive('ngSetorAdmin', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_coord", function (e) {
                scope.setordados = "";
                if (e != undefined) {
                    CoordService.getSetorbycoord(e, scope);
                    if (scope.setordados) {
                    }
                    else {
                        var array = { coord : ""+e}                        
                        scope.setordados = [array];
                        if (e != undefined) {
                            CoordService.getSubSetorbysetor(e, scope);
                        } else {
                            if (scope.subsetordados != undefined) {
                                scope.subsetordados = "";
                            }
                        }                        
                    }
                }
                else {
                    if (scope.setordados != undefined) {
                        scope.setordados = "";
                        scope.subsetordados = "";
                    }
                }
                scope.areadados = "";
                scope.servicedados = "";
            })
        }
    }
})
.directive('ngSubSetorAdmin', function (CoordService) {
    return {
        link: function (scope, element, attr) {            
            scope.$watch("seach.dest_setor", function (e) {                                 
                if (e != undefined) {
                    CoordService.getSubSetorbysetor(e, scope);
                    if (scope.subsetordados) {}
                    else {
                        CoordService.getSubSetorbysetor(scope.seach.dest_coord, scope);
                    }
                    scope.areadados = "";
                    scope.servicedados = "";                    
                }
                else {
                    if (scope.subsetordados != undefined) {
                        scope.subsetordados = "";
                    }
                }
                scope.areadados = "";
                scope.servicedados = ""; 
            })
            

        }
    }
})
.directive('ngAreaAdmin', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_sub_setor", function (e) {
                scope.servicedados = "";
                if (e != undefined) {
                    CoordService.getAreabysubsetor(e, scope);
                }
                else {
                    if (scope.areadados != undefined) {
                        scope.areadados = "";
                    }
                }
                
            })
        }
    }
})
.directive('ngServiceAdmin', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_area", function (e) {                
                if (e != undefined) {CoordService.getServicebyarea(scope.seach.dest_sub_setor, scope.seach.dest_area, scope)}
                else {
                    if (scope.servicedados != undefined) {
                        scope.servicedados = "";                       
                    }
                }
            })
        }
    }
})
.directive('enviadaSubsetor', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getSubSetorbysetor("", scope);
        }
    }
    
})
.directive('enviadaArea', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.sol_subsetor", function (e) {
                scope.servicedados = "";
                if (e != undefined) {
                    CoordService.getAreabysubsetor(e, scope);
                }
                else {
                    if (scope.areadados != undefined) {
                        scope.areadados = "";
                    }
                }
                
            })
        }
    }
    
})
.directive('ngSetor', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getSetorbycoord("", scope);
        }
    }
    
})
.directive('ngArea', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_subsetor", function (e) {
                if (e != undefined) {CoordService.getAreabysubsetor(e, scope);}
                else {
                    if (scope.areadados != undefined) {
                        scope.areadados = "";
                    }
                }
            })
        }
    }
})
.directive('ngService', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_area", function (e) {                
                if (e != undefined) {CoordService.getServicebyarea(scope.seach.dest_subsetor, scope.seach.dest_area, scope)}
                else {
                    if (scope.servicedados != undefined) {
                        scope.servicedados = "";
                    }
                }
            })
        }
    }
})
.directive('ngSubSetorResp', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getSubSetorResp(scope);
        }
    }
    
})
.directive('ngAreaResp', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_subsetor", function (e) {                
                if (e != undefined) {console.log(e);CoordService.getAreabysubsetor(e, scope);}
                else {
                    if (scope.areadados != undefined) {
                        scope.servicedados = "";
                        scope.areadados = "";
                    }
                }
            })
        }
    }
})
.directive('ngServiceResp', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_area", function (e) {                
                if (e != undefined) {CoordService.getServicebyarea(scope.seach.dest_subsetor, scope.seach.dest_area, scope)}
                else {
                    if (scope.servicedados != undefined) {
                        scope.servicedados = "";
                    }
                }
            })
        }
    }
})
.directive('ngAreaTec', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getAreaTec(scope);            
        }
    }
})
.directive('ngServiceTec', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            scope.$watch("seach.dest_area", function (e) {              
                if (e != undefined) {CoordService.getServicebyarea("", scope.seach.dest_area, scope)}
                else {
                    if (scope.servicedados != undefined) {
                        scope.servicedados = "";
                    }
                }
            })
        }
    }
})
.directive('ngRecarregar', function ($state) {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function () {
                $state.reload();
            });
        }
    }
})
.directive('laudoTecnico', function (CoordService, toaster, $state) {
    return {
        restrict: 'A',
        scope: {
            laudo: '=',
            topico: '=',
            idos: '=',
            idtec: '=',
            subsetor: '=',
            area: '='
        },
        link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$apply(function () {
                    if (scope.laudo != undefined && scope.topico != undefined) {
                        var obj = {id: scope.idos, idtec: scope.idtec, subsetor: scope.subsetor, area: scope.area, topico: scope.topico, laudo: scope.laudo};
                        CoordService.postLaudoTecnico(obj);
                    } else {
                        toaster.pop('info', "Preencha o topico e laudo", "", 10000, 'trustHtml');
                    }
                });
            });
        }
    }
})
.directive('ngAreatecnico', function(CoordService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            CoordService.getAreabysetor("", scope);
        }
    }
})
.directive('ngAndamento', function(toaster, CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            subsetor: '=',
            area: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function () {
                        CoordService.changeStatusAndamento({id: scope.idos, subsetor: scope.subsetor, area: scope.area});
                    });
                }
            });
        }
    }
})
.directive('lastLaudo', function (toaster, CoordService) {
    return {
        link: function (scope, element, attrs) {
            var promise = CoordService.lastLaudoById(scope.$ctrl.osid.id_os);
            promise.then(function (laudos) {
                scope.laudos = laudos;
            });
        }
    }
})
.directive('laudoSelectCoord', function (CoordService) { //21/01/2019 # 11/07/2019 modificado não usado
    return {
        link: function (scope, element, attrs) {
            element.on("click", function (e) {
                e.preventDefault();
                CoordService.getSetorbycoord("", scope);
            });
        }
    }
})
.directive('laudoSelectSetor', function (CoordService) { //11/07/2019
    return {
        link: function (scope, element, attrs) {
            element.on("click", function (e) {
                e.preventDefault();
                CoordService.getSubSetorbysetor("", scope);
            });
        }
    }
})
.directive('laudoSelectSubSetor', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            element.on("change", function (e) {
                e.preventDefault();
                var subsetor = scope.laudosubsetor;
                if (subsetor == undefined) {
                    scope.servicedados = "";
                    scope.areadados = "";
                } else {
                    CoordService.getAreabysubsetor(subsetor, scope);
                }
            });
            element.on("focus", function (e) {
                e.preventDefault();
                scope.servicedados = "";
                scope.areadados = "";
            });
        }
    }
})
.directive('laudoSelectArea', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            element.on("change", function (e) {
                e.preventDefault();
                var subsetor = scope.laudosubsetor;
                var area = scope.laudoarea;
                if (area == undefined) {
                    scope.servicedados = "";
                } else {
                    CoordService.getServicebyarea(subsetor, area, scope);
                }
            });
            element.on("focus", function (e) {
                e.preventDefault();
                scope.servicedados = "";
            });
        }
    }
})
.directive('laudoChange', function (toaster, CoordService, $state, $timeout) {
    return {
        restrict: 'A',
        scope: {
            subsetor: '=',
            area: '=',
            service: '=',
            changesubsetor: '=',
            changearea: '=',
            changeservice: '=',
            idos: '=',
            motivo: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        if (scope.changeservice != undefined && scope.changesubsetor != undefined && scope.changearea != undefined && scope.motivo != undefined && scope.idos != undefined) {
                            CoordService.mudarLaudoDestino({id: scope.idos, subsetor: scope.subsetor, area: scope.area, service: scope.service, changesubsetor: scope.changesubsetor, changearea: scope.changearea, changeservice: scope.changeservice, motivo: scope.motivo}); // aplicar o direcionamento se erro for falso na resposta
                            $timeout(function() {}, 2000);
                            $state.go('dashboard.os');
                        } else {
                            alert("Preencha os campos");
                        }
                    });
                }
            });

        }
    }
})
.directive('closeModal', function ($anchorScroll, $location, $state) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function() {
                angular.element('#bodyprincipal').removeAttr('style');
                angular.element('#bodyprincipal').removeClass('modal-open');
                angular.element('.modal-backdrop').remove();
                $state.go('dashboard.os');
                $location.hash('bodyprincipal');
                $anchorScroll();
            })
            
        }
    }
})
.directive('topoPage', function ($anchorScroll, $location) {
    return {
        retrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function () {
                $location.hash('bodyprincipal');
                $anchorScroll();
            })
        }
    }
})
.directive('laudoEncerra', function (toaster, CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            subsetor: '=',
            area: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch("confcheck", function (r) {
                if (r == true) {
                    element.on('click', function () {
                        var obj = {id: scope.idos, subsetor: scope.subsetor, area: scope.area};
                        CoordService.encerraOS(obj);
                    });
                }
            });

        }
    }
})
.directive('laudoRenovaOrdem', function (toaster, CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            subsetor: '=',
            area: '=',
            motivo: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        if (scope.idos != undefined && scope.motivo != undefined && scope.motivo != "") {
                            var obj = {id: scope.idos, subsetor: scope.subsetor, area: scope.area, motivo: scope.motivo};
                            CoordService.renovarOS(obj);
                        } else {
                            if (scope.motivo != "") {
                                alert("Preencha o motivo da renovação desta Ordem de Serviço.");
                            } else {
                                alert("Falha, tente denovo");
                            }
                        }
                    });
                }
            });

        }
    }
})
.directive("viewsTecnico", function (CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            num: '=',
            status: '=',
            coord: '=',
            setor: '=',
            subsetor: '=',
            area: '=',
            pag: '='            
        },
        link: function (scope, element, attrs) {
            var id = scope.idos;
            var num = scope.num;
            var status = scope.status;
            var coord = scope.coord;
            var setor = scope.setor;
            var subsetor = scope.subsetor;
            var area = scope.area;
            var pag = attrs.pag;
            if (id != undefined && num != undefined && status != undefined) {
                var obj = {'id': id, 'num': num, 'status': status, 'coord': coord, 'setor': setor, 'subsetor': subsetor, 'area': area, 'pag': pag};
                CoordService.parseViews(obj);
            } else {
                alert("Falha, tente denovo")
            }
            
        }
    }
})
.directive("laudoEspera", function (CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            subsetor: '=',
            area: '=',
            resposta: '=',
            confcheckespera: '='
        },
        link: function (scope, element, attr) {
            scope.$watch('confcheckespera', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        if (scope.idos != undefined && scope.resposta != undefined && scope.resposta != "") {
                            CoordService.esperaOs({id: scope.idos, subsetor: scope.subsetor, area: scope.area, texto: scope.resposta});
                        } else {
                            alert("Preencha o Texto e Reconfirme");
                        }
                    });
                }
            });
        }
    }
})
.directive("laudoAtiva", function (CoordService) {
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            subsetor: '=',
            area: '=',
            resposta: '=',
            confchecktiraespera: '='
        },
        link: function (scope, element, attr) {
            scope.$watch('confchecktiraespera', function (r) {
                if (r == true) {
                    element.on("click", function (e) {
                        e.preventDefault();
                        if (scope.idos != undefined && scope.resposta != undefined && scope.resposta != "") {
                            CoordService.ativaOS({id: scope.idos, subsetor: scope.subsetor, area: scope.area, texto: scope.resposta});
                        } else {
                            alert("Preencha o Texto e Reconfirme");
                        }
                    })
                }
            });

        }
    }
})
.directive("clearNotification", function (CoordService) {
    return {
        restrict: 'A',
        scope: {
            id: '='
        },
        link: function (s, e, a) {
            CoordService.clearNotification(s.id);
        }
    }

})
.directive("coordCarrega", function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getCoord(scope);
        }
    }
})
.directive("setorCarrega", function (CoordService) {
    return {
        link: function (scope, element, attr) {
            element.on("focus", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (scope.tec.coord) {
                    CoordService.getSetorbycoord(scope.tec.coord, scope);
                }
            });
        }
    }
})
.directive("areaCarrega", function (CoordService) {
    return {
        link: function(scope, element, attr) {
            element.on("focus", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (scope.tec.setor) {
                    CoordService.getAreabysetor(scope.tec.setor, scope);
                }
            });
        }
    }
})
.directive("changeOptions", function (CoordService) {
    return {
        link: function (scope, element, attr) {
            CoordService.getCoord(scope);
            scope.changeCoord = function (coord) {
                CoordService.getSetorbycoord(scope.tec.coord, scope);
                scope.tec.setor = "";
                scope.tec.area = "";
            }
            scope.changeSetor = function (setor) {
                CoordService.getAreabysetor(scope.tec.setor, scope);
                scope.tec.area = "";

            }
        }
    }
})
.directive("gerarPdf", function (CoordService) {
    return {
        scope: {
            order: '='
        },
        link: function (scope, element, attr) {
            element.on("click", function () {
                CoordService.gerarPdf(scope.order);                
            });
        }
    }
})
.directive("cadSolic", function (CoordService) {
    return {
        scope: {
            user: '='
        },
        link: function (scope, element, attr) {
            element.on("click", function () {
                CoordService.criarSolicitante();
            })
        }
    }
})