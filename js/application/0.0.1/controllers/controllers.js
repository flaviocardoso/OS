// controles
'use strict';

angular.module('app')

.controller("loginCtrl", function($rootScope, $scope, $state, $http, $location, $timeout, ngProgressFactory, loginService) { // mofificar depois
    $scope.location = $location.path();

    $scope.login = function(user) {
        loginService.login(user, $scope, $rootScope);
    }

    $scope.clearMsg = function() {
        $scope.errorLogin = false;
    }
})
.controller('dashboardCtrl', function($scope, loginService, loginSessionService, ngProgressFactory, $timeout, $state, $window) {
    var prevScrpos = $window.pageYOffset;
    $window.onscroll = function () {
        var currScrpos = $window.pageYOffset;
        if (prevScrpos > currScrpos) {
            angular.element("#navmenu").css('visibility', 'visible');
            angular.element("#navmenu").css('z-index', '8');
            angular.element("#painelmenu").css('opacity', '0');
            angular.element("#bottonangleup").css('opacity', '0');
        } else {
            angular.element("#navmenu").css('visibility', "hidden");
            angular.element("#navmenu").css('z-index', '7');
            angular.element("#painelmenu").css('opacity', '1');
            angular.element("#bottonangleup").css('opacity', '1');
        }
        prevScrpos = currScrpos;
    }

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
.controller('osCtrl', function($rootScope, $scope, $location, $timeout, loginService, ngProgressFactory) {
    $scope.logout = function() {
        loginService.logout();
    }
})
.controller('criarosCtrl', function($scope, CoordService, toaster, $state) {
    var err = 0;
    $scope.service = {}; // dados guardados em service do scope
    // $scope.service.sol_setor = "COADMIN";
    var dados = {}; // dados guardados em dados
    $scope.criarOS = function(scope) {
        dados['sol_ala'] = ""; // guarda dado de solicitante area como se tivesse vazio. solicitante area é uma opção.
        dados['sol_sala'] = ""; // guarda dado de solicitante sala como se tivesse vazio. solicitante sala é uma opção.
        dados['sol_setor'] = "";
        // mensagens exibidas uma de cada vez e em ordem
        if ($scope.service.sol == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Solicitante no Solicitante", 10000, 'trustedHtml');
            //alert("Preencha o campo de solicitante");
            return;
        }
        if ($scope.service.sol_email == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Email no Solicitante", 10000, 'trustedHtml');
            //alert("Preencha o campo de email do solicitante");
            return;
        }
        if ($scope.service.sol_coord == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Coordenação no Solicitante", 10000, 'trustedHtml');
            //alert("Preencha o campo de coordenação do solicitante");
            return;
        }
        if ($scope.service.sol_ramal == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Ramal no Solicitante", 10000, 'trustedHtml');
            //alert("Preencha o campo de ramal do solicitante");
            return;
        }
        if ($scope.service.dest_coord == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Coordenação na Destinação", 10000, 'trustedHtml');
            //alert("Preencha o campo de coordenação para a destinação");
            return;
        }
        if ($scope.service.dest_area == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Area na Destinação", 10000, 'trustedHtml');
            //alert("Preencha o campo de area para a destinação");
            return;
        }
        if ($scope.service.dest_service == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Tópico de Descrição na Descrição", 10000, 'trustedHtml');
            return;
        }
        if ($scope.service.descr == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Descrição na Descrição", 10000, 'trustedHtml');
            //alert("Preencha o campo de descrição para a ordem de serviço");
            return;
        }

        dados['sol'] = $scope.service.sol; // guarda dado do nome do solicitante do scope de sol em sol da variavel dados
        dados['sol_email'] = $scope.service.sol_email; // guarda dado do email do solicitante do scope de sol_email em sol_email da variavel dados
        dados['sol_coord'] = $scope.service.sol_coord; // guarda dado do coordenação do solicitante do scope de sol_coord em sol_coord da variavel dados
        dados['sol_setor'] = $scope.service.sol_setor; // guarda dado do setor do solicitante do scope de sol_setor em sol_setor da variavel dados
        if ($scope.service.sol_ala) {
            dados['sol_ala'] = $scope.service.sol_ala; // guarda dado do ala do solicitante do scope de sol_ala em sol_ala da variavel dados
        }
        if ($scope.service.sol_sala) {
            dados['sol_sala'] = $scope.service.sol_sala; // guarda dado do sala do solicitante do scope de sol_sala em sol_sala da variavel dados
        }
        dados['sol_ramal'] = $scope.service.sol_ramal; // guarda dado do ramal do solicitante do scope de sol_ramal em sol_ramal da variavel dados
        dados['dest_coord'] = $scope.service.dest_coord; // guarda dado do coordenação do destino do scope de dest_coord em dest_coord da variavel dados
        dados['dest_setor'] = $scope.service.dest_setor; // guarda dado do setor do destino do scope de dest_setor em dest_setor da variavel dados
        dados['dest_subsetor'] = $scope.service.dest_subsetor;
        dados['dest_area'] = $scope.service.dest_area; // guarda dado do area do destino do scope de dest_area em dest_area da variavel dados
        dados['dest_service'] = $scope.service.dest_service; // guarda dado do topico de descrição do scope de descr_topic em descr_topic da variável dados
        dados['descr'] = $scope.service.descr; // guarda dado do descrição do descrição do scope de descr em descr da variavel dados

        scope.buttonShow = false;

        if (scope.files != undefined) {
            var promise = CoordService.enviarFile(scope);
            promise.then(function(resp) {
                if (resp) {
                    if (resp == "erro") {
                        if (err > 1) {
                            toaster.pop('info', "Informação:", "Por favor entre em contato para resolução do problema");
                        } else {
                            toaster.pop('info', "Informação:", "Não é possivel enviar o arquivo no momento, por favor tente novamente!", 10000, 'trustedHtml');
                        }
                        err = err + 1;
                    }
                    else {
                        dados['arq'] = resp;
                        CoordService.postCriarOS(dados);
                        toaster.pop('info', "Informação:", "Ordem de Serviço enviada", 10000, 'trustedHtml');
                        $state.go('dashboard.os'); // 03/02
                    }
                } else {
                    toaster.pop('error', "Erro ao enviar arquivo. Arquivo não enviado!", 10000, 'trustedHtml');
                }
            });
        } else {
            dados['arq'] = "";
            CoordService.postCriarOS(dados);            
            $state.go('dashboard.os'); // 03/02
        }
        console.log(dados);


    }

    $scope.preResposta = function () {
        // 
    }
})
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
.controller('verCtrl', function () {})
.controller('contatoCtrl', function($rootScope, $location) {
    $rootScope.activetab = $location.path();
    $rootScope.menu = true;
    $rootScope.location = $location;
})



.controller('sobreCtrl', function($rootScope, $location) {
        $rootScope.activetab = $location.path();
        $rootScope.menu = true;
        $rootScope.location = $location;
    })

.controller('verOsCtrl', function($scope, $state, $rootScope, OrdemService, toaster, toasterConfig) {
    console.log("controle verOs");

    console.log($state.transition);

    $scope.recarregar = function () { // já existe uma directive para isso
        $state.reload();
    }

    $scope.changeDate = function(data) { // não mais usado
        var date = new Date(d);
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var ano = date.getFullYear();
        var hora = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        $scope.data_time = dia + "/" + mes + "/" + ano + " " + hora + ":" + min + ":" + sec;
    }

    $scope.verInfoOS = function(id) { // não usado
        var html = "";

        var promise = OrdemService.getOrdem(id);

        promise.then(function(ordem) {
            html = html + "<div>Nº : " + ordem.n_os + "</div>";
            html = html + "<div class=\"display-os\"><b>Criação : &nbsp;</b>";
            html = html + "<div><span>" + ordem.data_in + "</span></div></div>&nbsp;&nbsp;";
            html = html + "<div class=\"display-os\"><b>Modicação : &nbsp;</b>";
            html = html + "<div><span>" + ordem.data_up + "</span></div></div>";html = html + "<br><b>Solicitante info : &nbsp;</b>";
            html = html + "<div class=\"display-os\"><span><b>Nome:</b> " + ordem.solicitante.split(" ", 2).join(" ") + "&nbsp;&nbsp;</span></div>";
            html = html + "<div class=\"display-os\"><span><b>Email:</b> " + ordem.sol_email + "&nbsp;&nbsp;</span></div>";
            html = html + "<div class=\"display-os\"><span><b>Ramal:</b> " + ordem.sol_ramal + "&nbsp;&nbsp;</span></div>";
            html = html + "<br><b>Topico de Descrição : &nbsp;</b>";
            html = html + "<span>" + ordem.descr_topic + "</span>";
            html = html + "<br><b>Tecnico info : &nbsp;</b>";
            html = html + "<div class=\"display-os\"><span><b>Nome:</b> " + "&nbsp;&nbsp;</span></div>";
            html = html + "<div class=\"display-os\"><span><b>Email:</b> " + "&nbsp;&nbsp;</span></div>";
            html = html + "<div class=\"display-os\"><span><b>Ramal:</b> " + "&nbsp;&nbsp;</span></div>";
            html = html + "<br><b>Topico de Laudo : &nbsp;</b>";
            html = html + "<span>Pequena descrição do laudo para ordem de serviço.</span>";
            toaster.pop({ type: 'toast', title: "Informação OS", body: html, bodyOutputType: 'trustedHtml', timeOut: 20000, toasterId: "info-order-service", showCloseButton: true }); //'toast', "Informação:", html, 10000, 'trustedHtml');
        })
    }
})
.controller('editeteclistaCtrl', function () {})
.controller('verOsidCtrl', function ($scope, $window, $state, $stateParams, CoordService) {
    var origin = window.location.origin;
    $scope.recarregar = function () {
        $state.reload($state.current);
    }

    $scope.linkFile = function (file) { 
        location.assign(origin + '/app/data/app.php?d=downloadFile&file=' + file); // verifica o nome do arquivo
    }
})
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
.controller('recebidavernovaCtrl', function () {})
.controller('recebidaverandamentoCtrl', function () {})
.controller('recebidaveresperaCtrl', function () {})
.controller('recebidaverencerradaCtrl', function () {})
.controller('recebidaversecrnovaCtrl', function () {})
.controller('recebidaversecrandamentoCtrl', function () {})
.controller('recebidaversecresperaCtrl', function () {})
.controller('recebidaversecrencerradaCtrl', function () {})
.controller('recebidaverrespnovaCtrl', function () {})
.controller('recebidaverrespandamentoCtrl', function () {})
.controller('recebidaverrespesperaCtrl', function () {})
.controller('recebidaverrespencerradaCtrl', function () {})
.controller('recebidavertecnovaCtrl', function () {})
.controller('recebidavertecandamentoCtrl', function () {})
.controller('recebidavertecesperaCtrl', function () {})
.controller('recebidavertecencerradaCtrl', function () {})
.controller('inforecebidaversecrnovaCtrl', function () {})
.controller('inforecebidaversecrandamentoCtrl', function () {})
.controller('inforecebidaversecresperaCtrl', function () {})
.controller('inforecebidaversecrencerradaCtrl', function () {})
.controller('inforecebidaverrespnovaCtrl', function () {})
.controller('inforecebidaverrespandamentoCtrl', function () {})
.controller('inforecebidaverrespesperaCtrl', function () {})
.controller('inforecebidaverrespencerradaCtrl', function () {})
.controller('inforecebidavertecnovaCtrl', function () {})
.controller('inforecebidavertecandamentoCtrl', function () {})
.controller('inforecebidavertecesperaCtrl', function () {})
.controller('inforecebidavertecencerradaCtrl', function () {})
.controller('enviadavernovaCtrl', function () {})
.controller('enviadaverandamentoCtrl', function () {})
.controller('enviadaveresperaCtrl', function () {})
.controller('enviadaverencerradaCtrl', function () {})
.controller('solicvernovaCtrl', function () {})
.controller('solicverandamentoCtrl', function () {})
.controller('solicveresperaCtrl', function () {})
.controller('solicverencerradaCtrl', function () {})
.controller('inforecebidavernovaCtrl', function () {})
.controller('inforecebidaverandamentoCtrl', function () {})
.controller('inforecebidaveresperaCtrl', function () {})
.controller('inforecebidaverencerradaCtrl', function () {})
.controller('infoenviadavernovaCtrl', function () {})
.controller('infoenviadaverandamentoCtrl', function () {})
.controller('infoenviadaveresperaCtrl', function () {})
.controller('infoenviadaverencerradaCtrl', function () {})
.controller('infosolicnovaCtrl', function () {})
.controller('infosolicandamentoCtrl', function () {})
.controller('infosolicesperaCtrl', function () {})
.controller('infosolicencerradaCtrl', function () {})
.controller('editadalaudoverrespnovaCtrl', function () {})
.controller('editadalaudoverrespandamentoCtrl', function () {})
.controller('editadalaudoverrespesperaCtrl', function () {})
.controller('editadalaudoverrespencerradaCtrl', function () {})
.controller('editadalaudovertecnovaCtrl', function () {})
.controller('editadalaudovertecandamentoCtrl', function () {})
.controller('editadalaudovertecesperaCtrl', function () {})
.controller('editadalaudovertecencerradaCtrl', function () {})
.controller('infoeditadalaudorespnovaCtrl', function () {})
.controller('infoeditadalaudorespandamentoCtrl', function () {})
.controller('infoeditadalaudorespesperaCtrl', function () {})
.controller('infoeditadalaudorespencerradaCtrl', function () {})
.controller('infoeditadalaudotecnovaCtrl', function () {})
.controller('infoeditadalaudotecandamentoCtrl', function () {})
.controller('infoeditadalaudotecesperaCtrl', function () {})
.controller('infoeditadalaudotecencerradaCtrl', function () {})
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