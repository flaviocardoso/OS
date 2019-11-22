'use strict';

angular.module('app')

.controller('criarosCtrl', function($scope, CoordService, toaster, $state) {
    angular.element("#navmenu").css('visibility', 'visible');
    angular.element("#navmenu").css('z-index', '8');
    angular.element("#painelmenu").css('opacity', '0');
    angular.element("#bottonangleup").css('opacity', '0');

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