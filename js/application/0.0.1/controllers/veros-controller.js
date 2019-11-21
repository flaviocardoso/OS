'use strict';

angular.module('app')

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