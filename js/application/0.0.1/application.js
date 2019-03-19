//application.js

// application.js
// todo junto -> experimento OK!

'use strict';

angular.module('app', ['ui.router', 'ngAnimate', 'ngProgress', 'toaster'])
    // configuração
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, roleContextHelperProvider) {
        // retira o "#" para enabled true e base para uma requiredBase true
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
        //teste OK!
        var states = [
            {
                name: 'login', /* login */
                url: '/login',
                data: { title: 'Login CBPF/OS', nome: 'Entrar' },
                component: 'login'
            },
            {   // direrionamento grupos
                name: 'dashboard', /* dashboard */
                url: '',
                //component: 'dashboard'
                templateProvider: roleContextHelperProvider.templateProvider({
                    "admin": '/app/views/app.php?v=dashboardadmin',
                    "secr": '/app/views/app.php?v=dashboardsecr',
                    "resp": '/app/views/app.php?v=dashboardresp',
                    "tec": '/app/views/app.php?v=dashboardtec',
                    "sol": '/app/views/app.php?v=dashboard',
                    "":  '/app/views/app.php?v=dashboard'
                }),
                controller: 'dashboardCtrl'
            },
            {   // directionamento grupos Ordem de Serviço - painel da Ordem de Serviços também vai ter que dividir futuralmente, criar para cada grupo abaixo
                name: 'dashboard.os', /* os hander */
                url: '/',
                data: { title: 'CBPF/OS', nome: 'Ordem de Serviço CBPF' },
                component: 'os'
            },  /* Dividindo paineis para cada grupo para criar menu central e gráficos
            {
                name: 'dashboard.os',
                url: '',
                templateProvider: roleContextHelperProvider.templateProvider({
                    admin: '/app/views/painelosadadmin.php',
                    secr: '/app/views/painelossecr.php',
                    resp: '/app/views/painelosresp.php',
                    tec: '/app/views/painelostec.php',
                    sol: '/app/views/painelos.php'
                }),
                controllerProvider: roleContextHelperProvider.controllerProvider({
                    admin: 'osadminCtrl',
                    secr: 'ossecrCtrl',
                    resp: 'osrespCtrl',
                    tec: 'ostecCtrl',
                    sol: 'ossolCtrl'
                })
            },  */
            {   // Teste De Funções
                name: 'dashboard.os.teste',
                url: 'teste', /* teste handler */
                data: { title: 'Teste', nome: 'Teste' },
                component: 'teste'
            }, // Funções para Admin
            {   // Criação de Novas Ordens de Serviço
                name: 'dashboard.os.criaros', /* criar handler */
                url: 'criaros',
                data: { title: 'CRIAR OS', nome: "Criar OS" },
                component: 'criaros'
            },
            {   // Cr. OS. para solicitante
                name: 'dashboard.os.criaros.solic',
                url: '-solic', /* criar-solic handler */
                component: 'criarossolic',
                data: { nome: "Solicitante" }
            },
            {   // Cr. OS. para destinação
                name: 'dashboard.os.criaros.dest',
                url: '-dest', /* criar-desc handler */
                component: 'criarosdest',
                data: { nome: "Destinação" }
            },
            {   // Cr. OS. para descrição
                name: 'dashboard.os.criaros.descr',
                url: '-descr', /* criar-descr */
                component: 'criarosdescr',
                data: { nome: "Descrição" }
            },
            {   // Criação de Um Novo Técnico
                name: 'dashboard.os.criartec',
                url: 'criartec',
                component: 'criartec',
                data: { title: 'Criar Técnico', nome: 'Criar Técnico' },
            },
            {   // Editar Um Técnico Existente - lista de Técnicos
                name: 'dashboard.os.editeteclista',
                url: 'editeteclista',
                component: 'editeteclista',
                data: {title: 'Lista de Técnicos', nome: 'Lista de Técnicos'},
                resolve: { verTecList: function(OrdemService) { return OrdemService.getTecList(); } }
            },
            {
                name: 'dashboard.os.editetec',
                url: 'editetec/{tecID}',
                component: 'editetec',
                data: { title: 'Edite Técnico', nome: 'Edite Técnico' },
                resolve: { tecid: function(OrdemService, $transition$) { return OrdemService.getTecEditar($transition$.params().tecID) } }
            },
            {
                name: 'dashboard.os.ver',
                url: 'ver-os', /* direção para lista das ordens de servicos */
                data: { title: 'Ordens de Serviço', nome : "S. Ordem de Serviço" },
                component: 'ver'
            },// Ordens de Serviço Enviadas lista enviar - admin, resp, secr (coord)
            {
                name: 'dashboard.os.ver.enviadavernova',
                url: '',
                component: 'enviadavernova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaNova(); } }
            },
            {
                name: 'dashboard.os.ver.enviadaverandamento',
                url: '',
                component: 'enviadaverandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaAndamento(); } }
            },
            {
                name: 'dashboard.os.ver.enviadaverespera',
                url: '',
                component: 'enviadaverespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEspera(); } }
            },
            {
                name: 'dashboard.os.ver.enviadaverencerrada',
                url: '',
                component: 'enviadaverencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEncerrada(); } }
            }, // Informação Enviadas das Ordens de Serviço - admin, resp, secr (coord)
            {
                name: 'dashboard.os.infoenviadavernova',
                url: 'info-enviada-nova/{osID}',
                component: 'infoenviadavernova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.infoenviadaverandamento',
                url: 'info-enviada-andamento/{osID}',
                component: 'infoenviadaverandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.infoenviadaverespera',
                url: 'info-enviada-espera/{osID}',
                component: 'infoenviadaverespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEsperada($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.infoenviadaverencerrada',
                url: 'info-enviada-encerrada/{osID}',
                component: 'infoenviadaverencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEncerrada($transition$.params().osID) } }
            },  // Ordens de Serviço Recebidas lista enviar
            {
                name: 'dashboard.os.ver.recebidavernova',
                url: '',
                component: 'recebidavernova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaNova(); } }
            },
            {
                name: 'dashboard.os.ver.recebidaverandamento',
                url: '',
                component: 'recebidaverandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaAndamento(); } }
            },
            {
                name: 'dashboard.os.ver.recebidaverespera',
                url: '',
                component: 'recebidaverespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaEspera(); } }
            },
            {
                name: 'dashboard.os.ver.recebidaverencerrada',
                url: '',
                component: 'recebidaverencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaEncerrada(); } }
            }, // Informação Recebidas das Ordens de Serviço - admin, secr (coord)
            {
                name: 'dashboard.os.inforecebidavernova',
                url: 'info-recebida-nova/{osID}',
                component: 'inforecebidavernova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.inforecebidavernovaedite',
                url: 'info-recebida-nova/{osID}/edite',
                component: 'editenova',
                data: {title: 'Edite Ordem de Serviço', nome: 'Edite Ordem de Serviço'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.inforecebidaverandamento',
                url: 'info-recebida-andamento/{osID}',
                component: 'inforecebidaverandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.inforecebidaverespera',
                url: 'info-recebida-espera/{osID}',
                component: 'inforecebidaverespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaEsperada($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.inforecebidaverencerrada',
                url: 'info-recebida-encerrada/{osID}',
                component: 'inforecebidaverencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaEncerrada($transition$.params().osID) } }
            },  // Admin --> laudo editado por user
            {
                name: 'dashboard.os.ver.editadalaudovernova',
                url: '',
                component: 'editadalaudovernova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoNova(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudonova',
                url: 'info-editada-nova/{osID}',
                component: 'infoeditadalaudonova',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverandamento',
                url: '',
                component: 'editadalaudoverandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoAndamento(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudoandamento',
                url: 'info-editada-andamento/{osID}',
                component: 'infoeditadalaudoandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverespera',
                url: '',
                component: 'editadalaudoverespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoEspera(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudoespera',
                url: 'info-editada-espera/{osID}',
                component: 'infoeditadalaudoespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverencerrada',
                url: '',
                component: 'editadalaudoverencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoEncerrada(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudoencerrada',
                url: 'info-editada-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoEncerrada($transition$.params().osID) } }
            }, // Solicitante --> Acompanhar Ordem de Serviço por user
            {
                name: 'dashboard.os.ver.solicvernova',
                url: '',
                component: 'solicvernova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicNova(); } }
            },
            {
                name: 'dashboard.os.infosolicnova',
                url: 'info-os-solic-nova/{osID}',
                component: 'infosolicnova',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.solicverandamento',
                url: '',
                component: 'solicverandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicAndamento(); } }
            },
            {
                name: 'dashboard.os.infosolicandamento',
                url: 'info-os-solic-andameto/{osID}',
                component: 'infosolicandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.solicverespera',
                url: '',
                component: 'solicverespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicEspera(); } }
            },
            {
                name: 'dashboard.os.infosolicespera',
                url: 'info-os-solic-espera/{osID}',
                component: 'infosolicespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.solicverencerrada',
                url: '',
                component: 'solicverencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicEncerrada(); } }
            },
            {
                name: 'dashboard.os.infosolicencerrada',
                url: 'info-os-solic-encerrada/{osID}',
                component: 'infosolicencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicEncerrada($transition$.params().osID) } }
            },  // Secretaria OS
            {
                name: 'dashboard.os.ver.recebidaversecrnova',
                url: '',
                component: 'recebidaversecrnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaSecrNova(); } }
            },
            {
                name: 'dashboard.os.inforecebidaversecrnova',
                url: 'info-recebida-secr-nova/{osID}',
                component: 'inforcebidaversecrnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaversecrandamento',
                url: '',
                component: 'recebidaversecrandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaSecrAndamento(); } }
            },
            {
                name: 'dashboard.os.inforecebidaversecrAndamento',
                url: 'info-recebida-secr-andamento/{osID}',
                component: 'inforcebidaversecrandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaversecrespera',
                url: '',
                component: 'recebidaversecrespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaSecrEspera(); } }
            },
            {
                name: 'dashboard.os.inforecebidaversecrespera',
                url: 'info-recebida-secr-espera/{osID}',
                component: 'inforcebidaversecrespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaversecrencerrada',
                url: '',
                component: 'recebidaversecrencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaSecrEncerrada(); } }
            },
            {
                name: 'dashboard.os.inforecebidaversecrencerrada',
                url: 'info-recebida-secr-encerrada/{osID}',
                component: 'inforcebidaversecrencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrEncerrada($transition$.params().osID) } }
            },// Secretaria --> laudo editado por user
            {
                name: 'dashboard.os.ver.editadalaudoversecrnova',
                url: '',
                component: 'editadalaudoversecrnova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrNova(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudosecrnova',
                url: 'info-editada-secr-nova/{osID}',
                component: 'infoeditadalaudosecrnova',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoversecrandamento',
                url: '',
                component: 'editadalaudoversecrandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrAndamento(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudosecrandamento',
                url: 'info-editada-secr-andamento/{osID}',
                component: 'infoeditadalaudosecrandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoversecrespera',
                url: '',
                component: 'editadalaudoversecrespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrEspera(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudosecrespera',
                url: 'info-editada-secr-espera/{osID}',
                component: 'infoeditadalaudosecrespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoversecrencerrada',
                url: '',
                component: 'editadalaudoversecrencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrEncerrada(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudosecrencerrada',
                url: 'info-editada-secr-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrEncerrada($transition$.params().osID) } }
            },  // Responsável OS
            {
                name: 'dashboard.os.ver.recebidaverrespnova',
                url: '',
                component: 'recebidaverrespnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaRespNova(); } }
            },
            {
                name: 'dashboard.os.inforecebidaverrespnova',
                url: 'info-recebida-resp-nova/{osID}',
                component: 'inforcebidaverrespnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaverrespandamento',
                url: '',
                component: 'recebidaverrespandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaRespAndamento(); } }
            },
            {
                name: 'dashboard.os.inforecebidaverrespandamento',
                url: 'info-recebida-resp-andamento/{osID}',
                component: 'inforcebidaverrespandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaverrespespera',
                url: '',
                component: 'recebidaverrespespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaRespEspera(); } }
            },
            {
                name: 'dashboard.os.inforecebidaverrespespera',
                url: 'info-recebida-resp-espera/{osID}',
                component: 'inforcebidaverrespespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidaverrespencerrada',
                url: '',
                component: 'recebidaverrespencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaRespEncerrada(); } }
            },
            {
                name: 'dashboard.os.inforecebidaverrespencerrada',
                url: 'info-recebida-resp-encerrada/{osID}',
                component: 'inforcebidaverrespencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespEncerrada($transition$.params().osID) } }
            },// Resposável --> laudo editado por user
            {
                name: 'dashboard.os.ver.editadalaudoverrespnova',
                url: '',
                component: 'editadalaudoverrespnova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespNova(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudorespnova',
                url: 'info-editada-resp-nova/{osID}',
                component: 'infoeditadalaudorespnova',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverrespandamento',
                url: '',
                component: 'editadalaudoverrespandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespAndamento(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudorespandamento',
                url: 'info-editada-resp-andamento/{osID}',
                component: 'infoeditadalaudorespandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverrespespera',
                url: '',
                component: 'editadalaudoverrespespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespEspera(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudorespespera',
                url: 'info-editada-resp-espera/{osID}',
                component: 'infoeditadalaudorespespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudoverrespencerrada',
                url: '',
                component: 'editadalaudoverrespencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespEncerrada(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudorespencerrada',
                url: 'info-editada-resp-encerrada/{osID}',
                component: 'infoeditadalaudorespencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespEncerrada($transition$.params().osID) } }
            }, // Técnico OS
            {
                name: 'dashboard.os.ver.recebidavertecnova',
                url: '',
                component: 'recebidavertecnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaTecNova(); } }
            },
            {
                name: 'dashboard.os.inforecebidavertecnova',
                url: 'info-recebida-tec-nova/{osID}',
                component: 'inforcebidavertecnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidavertecandamento',
                url: '',
                component: 'recebidavertecandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaTecAndamento(); } }
            },
            {
                name: 'dashboard.os.inforecebidavertecandamento',
                url: 'info-recebida-tec-andamento/{osID}',
                component: 'inforcebidavertecandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidavertecespera',
                url: '',
                component: 'recebidavertecespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaTecEspera(); } }
            },
            {
                name: 'dashboard.os.inforecebidavertecespera',
                url: 'info-recebida-tec-espera/{osID}',
                component: 'inforcebidavertecespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.recebidavertecencerrada',
                url: '',
                component: 'recebidavertecencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRececidaTecEncerrada(); } }
            },
            {
                name: 'dashboard.os.inforecebidavertecencerrada',
                url: 'info-recebida-tec-encerrada/{osID}',
                component: 'inforcebidavertecencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecEncerrada($transition$.params().osID) } }
            },
            // Tecnico - laudo alteração
            {
                name: 'dashboard.os.ver.editadalaudovertecandamento',
                url: '',
                component: 'editadalaudovertecandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecAndamento(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudotecandamento',
                url: 'info-editada-tec-andamento/{osID}',
                component: 'infoeditadalaudotecandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudovertecespera',
                url: '',
                component: 'editadalaudovertecespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecEspera(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudotecespera',
                url: 'info-editada-tec-espera/{osID}',
                component: 'infoeditadalaudotecespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.os.ver.editadalaudovertecencerrada',
                url: '',
                component: 'editadalaudovertecencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecEncerrada(); } }
            },
            {
                name: 'dashboard.os.infoeditadalaudotecencerrada',
                url: 'info-editada-tec-encerrada/{osID}',
                component: 'infoeditadalaudotecencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecEncerrada($transition$.params().osID) } }
            },// ---- Fim
            {  // Antigas
                name: 'dashboard.os.verosinfo', /* editada */
             url: 'info/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfo',
             data: {nome: "Ver OS"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOrdem($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosinfonovas', /* editada */
             url: 'info-nova/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoNovas',
             data: {nome: "Ver OS Novas"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getNew($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosinfoandamento', /* editada */
             url: 'info-andamento/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoAndamento',
             data: {nome: "Ver OS Andamento"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getRun($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosinfoencerrada', /* editada */
             url: 'info-encerrada/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoEncerrada',
             data: {nome: "Ver OS Encerrada"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getEnd($transition$.params().osID) } }
            }, // ver informação de ordem de serviço tecnico
            { name: 'dashboard.os.verosinfotecnico',
             url: 'info/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoTecnico',
             data: {nome: "Ver OS"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOrdem($transition$.params().osID) } }
            }, // ver informação da ordem de serviço tecnico
            { name: 'dashboard.os.verosinfotecniconovas',
             url: 'info-novas/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoTecnicoNovas',
             data: {nome: "Ver OS Nova"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getTecnicoNew($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosinfotecnicoandamento',
             url: 'info-andamento/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoTecnicoAndamento',
             data:{nome: 'Ver OS Andamento'},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getTecnicoRun($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosinfotecnicoencerrada',
             url: 'info-encerrada/{osID}', /* número de id da ordem de serviço handler */
             component: 'verOsInfoTecnicoEncerrada',
             data: {nome: 'ver OS Encerrada'},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getTecnicoEnd($transition$.params().osID) } }
            }, // fim info ordem de serviço - ver ordens de serviço tecnico
            { name: 'dashboard.os.ver.ostecniconovas',
             url: '', /* número de id da ordem de serviço handler */
             component: 'verOsTecnicoNovas',
             data: { nome: 'ver Os Nova'},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSTecnicoNew(); } }
            },
            { name: 'dashboard.os.ver.ostecnicoandamento',
             url: '-andamento', /* número de id da ordem de serviço handler */
             component: 'verOsTecnicoAndamento',
             data: { nome: "Ver OS Andamento"},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSTecnicoRun(); } }
            },
            { name: 'dashboard.os.ver.ostecnicoencerrada',
             url: '-encerrada', /* número de id da ordem de serviço handler */
             component: 'verOsTecnicoEncerrada',
             data: {nome : 'Ver OS Encerrada'},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSTecnicoEnd(); } }
            },
            { name: 'dashboard.os.verosfile', //#
             url: '{osID}/file', /* handler não mais utilizado */
             component: 'verOsfile',
             data: { nome : 'Ver OS Arquivo'},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOrdem($transition$.params().osID) } }
            },
            { name: 'dashboard.os.verosedit', //#
             url: 'info/{osID}/edit', /* número de id da ordem de serviço e com capacidade de edição para ordem de serviços com status 'nova' */
             component: 'verOsedit',
             data: {nome : "Editar OS {{osID}}"},
             resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getNew($transition$.params().osID) } }
            },
            { name: 'dashboard.os.ver.emAnd', //#
             url: '-andamento',  /* ver ordens de serviço */
             component: 'verOsAndamento',
             data: { nome : 'ver OS Andamento'},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSRun(); } }
            },
            { name: 'dashboard.os.ver.novas', //#
             url: '-nova',  /* ver ordens de serviço */
             component: 'verOsNovas',
             data: {nome: 'Ver OS Novas'},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSNew(); } }
            },
            { name: 'dashboard.os.ver.encerr', //#
             url: '-encerrada',  /* ver ordens de serviço */
             component: 'verOsEncerrada',
             data: { nome : 'ver OS Encerrada'},
             resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnd(); } }
            },
            { name: 'dashboard.os.ver.os.todas',
             url: 'info/{osID}', /* handler não mais utilizado */
             component: 'verOsid',
             data: { nome : 'ver todas OS'},
             resolve: { osid: function(verOs, $stateParams) { return verOs.find(function(osid) { return osid.id === $stateParams.osID; }); } }
            },
            { name: 'dashboard.os.ver.osCoord',
             url: '-coordenacao', /* ver-coordenacao handler */
             component: 'verOsCoord'
            },
            { name: 'dashboard.os.ver.osSetor',
             url: '-setor',  /* ver-setor handler */
             component: 'verOsSetor'
            },
            { name: 'dashboard.os.ver.osAdmin',
             url: '-feitas', /* ver-feitas handler */
             component: 'verOsAdmin'
            },
            { name: 'dashboard.os.ver.osSolicitante',
             url: '-solicitadas', /* ver-solicitadas handler */
             component: 'verOsSolicitante',
             data: {nome : 'ver OS Pedidas'}
            },
            { name: 'dashboard.os.ver.osTecnico',
             url: '-editadas', /* ver-editas handler */
             component: 'verOsTecnico',
             data: { nome: 'ver OS Comentada'}
            }, // Fim ---
            { name: 'dashboard.sobre', // Criar sobres diferentes para cada tipo de grupo
             url: '/sobre',
             data: { title: 'SOBRE CBPF/OS', nome: 'Sobre'},
             component: 'sobre'
            },
            { name: 'dashboard.contato',
             url: '/contato',
             data: { title: 'CONTATO CBPF/OS', nome: "Contato"},
             component: 'contato'
            }
        ];
        //teste OK!
        //registrando estados
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
        $urlRouterProvider.otherwise('/login');
    })

// repetidor
.run(function($rootScope, $state, $stateParams, $transitions, $trace, loginService) {
    console.log("app run");
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //window['ui-router-visualizer'].visualizer(ng1UIRouter);
    //var Visualizer = window['ui-router-visualizer'].Visualizer;
    //$uiRouter.plugin(Visualizer);
    $trace.enabled('TRANSITION');

    //previne se não tiver login
    var statePermit = ['dashboard.os', 'dashboard.sobre', 'dashboard.contato'];
    $transitions.onStart({}, function(transition) {
        if (statePermit.indexOf(transition.$to().name) != -1) {
            var connected = loginService.islogged();
            connected.then(function(resp) {
                console.log(resp.data);
                if (!resp.data) {
                    $state.go('login');
                }
            })
        }
    });
    //não desloga acidentamente
    var sessionStarted = ['login'];
    //onStart() --> 1º parametro indica de para/de - exemplo {to : 'dashboard.home'}
    //tambem pode ser (to, from, entering, exiting, retained)
    //stados porder ser globais, exemplo: 'dashboard.**'
    //este primeiro parametro pode ver uma variavel, por exemplo: {to : (state) => state.name === 'login'}
    $transitions.onStart({}, function(transition) {
        if (sessionStarted.indexOf(transition.$to().name) != -1) {
            var cantgoback = loginService.islogged();
            cantgoback.then(function(resp) {
                console.log(resp.data);
                if (resp.data) {
                    $state.go('dashboard.os');
                }
            })
        }
    });
    //debub - states
    $transitions.onStart({}, function(transition) { //iniciando transições
        $state.prev = transition.$from().name;
        //$state.previous =  transition.$from().name;
        console.log("estado atual : " + transition.$to().name); // pega o nome do estado da transição atual
        console.log("estado anterior : " + transition.$from().name); // pega o nome do estado da transição antiga
    });
    // locatica estado para que vai ser enviado
    const criteriaObj = {
            to: (state) => !!state.data.title
        }
        // modifica titulo do documento
    $transitions.onSuccess(criteriaObj, function(transition) {
        document.title = transition.to().data.nome;
    });
})
// provider - 25/02/2019
.provider('roleContextHelper', function(){
    this.templateProvider = function(options){
        return function(loginGroup, $stateParams, $templateFactory){
            return loginGroup.group().then(function(role){
                return $templateFactory.fromUrl(options[role], $stateParams);
            });
        };
    };
    this.controllerProvider = function(options){
        return function(loginGroup){
            //the session role is already loaded since templateProvider must be first resolved
            return options[loginGroup.role];
        }
    };
    this.$get = function(){return this;};
})

// diretivas
.directive("anchorScroll", function ($state, $anchorScroll) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function (e) {
                e.preventDefault();
                $state.go($state.current).then (function () {$anchorScroll("topos");});
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
                e.preventDefault()/
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
.directive("fileDownload", function ($parse) { // teste de directive com attribute name functionando
    return {
        restrict: 'A',
        scope: {
            fileDownload: '='
        },
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
                e.preventDefault();
                scope.$apply(function() {
                    location.assign(window.location.origin + "/app/data/app.php?d=downloadFile&file=" + scope.fileDownload);
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
    console.log('laudo-tecnico');

    return {
        restrict: 'A',
        scope: {
            laudo: '=',
            topico: '=',
            idos: '=',
            idtec: '=',
            setor: '=',
            area: '='
        },
        link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$apply(function () {
                    // var laudo = scope.text;
                    // var laudo_topic = scope.topic;
                    // var idos = scope.idos;
                    // var idtec = scope.idtec;
                    // var setor = scope.setor;
                    // var area = scope.area;

                    if (scope.laudo != undefined && scope.topico != undefined) {
                        var obj = {id: scope.idos, idtec: scope.idtec, setor: scope.setor, area: scope.area, topico: scope.topico, laudo: scope.laudo};
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
            setor: '=',
            area: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function () {
                        // var id = scope.$ctrl.osid.id_os;
                        // console.log(id);

                        CoordService.changeStatusAndamento({id: scope.idos, setor: scope.setor, area: scope.area});
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
.directive('laudoSelectCoord', function (CoordService) { //21/01/2019
    return {
        link: function (scope, element, attrs) {
            element.on("click", function (e) {
                e.preventDefault();
                CoordService.getSetorbycoord("", scope);
            });

            // scope.$watch("laudosetor", function (s) {
            //     setor = s;
            //     if (check == true && setor != undefined) {
            //         CoordService.getAreabysetor(setor, scope);
            //     } else {
            //         scope.areadados = "";
            //     }
            // });

            // scope.$watch("laudoarea", function (a) {
            //     area = a;
            //     if (check == true && setor != undefined && area != undefined) {
            //         console.log("Setor: " + setor + ".Area: " + area);
            //     }
            // });

        }
    }
})
.directive('laudoSelectSetor', function (CoordService) {
    return {
        link: function (scope, element, attr) {
            // element.on("click", function (e) {
            //     e.preventDefault();
            //     console.log("click");
            //     var setor = scope.laudosetor;
            //     if (setor == undefined) {
            //         scope.areadados = "";
            //     } else {
            //         CoordService.getAreabysetor(setor, scope);
            //     }

            // });
            element.on("change", function (e) {
                e.preventDefault();
                console.log("change");
                var setor = scope.laudosetor;
                if (setor == undefined) {
                    scope.areadados = "";
                } else {
                    CoordService.getAreabysetor(setor, scope);
                }
            });
            element.on("focus", function (e) {
                e.preventDefault();
                scope.areadados = "";
                console.log("focus");
            });
        }
    }
})
.directive('laudoChange', function (toaster, CoordService) {
    console.log("laudo-change");
    return {
        restrict: 'A',
        scope: {
            setor: '=',
            area: '=',
            changesetor: '=',
            changearea: '=',
            idos: '=',
            motivo: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        if (scope.changesetor != undefined && scope.changearea != undefined && scope.motivo != undefined && scope.idos != undefined) {
                            CoordService.mudarLaudoDestino({id: scope.idos, setor: scope.setor, area: scope.area, changesetor: scope.changesetor, changearea: scope.changearea,motivo: scope.motivo}); // aplicar o direcionamento se erro for falso na resposta
                        } else {
                            alert("Preencha os campos");
                        }
                    });
                }
            });

        }
    }
})
.directive('laudoEncerra', function (toaster, CoordService) {
    console.log("laudo-encerra");

    return {
        restrict: 'A',
        scope: {
            idos: '=',
            setor: '=',
            area: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch("confcheck", function (r) {
                if (r == true) {
                    element.on('click', function () {
                        // var id = scope.idos;
                        // var setor = scope.setor;
                        // var area = scope.area;
                        // console.log(id);

                        var obj = {id: scope.idos, setor: scope.setor, area: scope.area};

                        CoordService.encerraOS(obj);
                    });
                }
            });

        }
    }
})
.directive('laudoRenovaOrdem', function (toaster, CoordService) {
    console.log("laudo-renova-ordem");

    return {
        restrict: 'A',
        scope: {
            idos: '=',
            setor: '=',
            area: '=',
            motivo: '=',
            confcheck: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('confcheck', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        // var id = scope.idos;
                        // var setor = scope.setor;
                        // var area = scope.area;
                        // var texto = scope.resposta;
                        if (scope.idos != undefined && scope.motivo != undefined && scope.motivo != "") {
                            var obj = {id: scope.idos, setor: scope.setor, area: scope.area, motivo: scope.motivo};
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
.directive("viewsTecnico", function (CoordService) { // 31/01/2019
    console.log("views-tecnico");
    return {
        restrict: 'A',
        scope: {
            order: '='
        },
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault()
                var ordem = scope.order;
                var id = ordem.id_os;
                var n = ordem.n_os;
                if (id != undefined && n != undefined) {
                    CoordService.parseViews(id, n);
                } else {
                    alert("Falha, tente denovo")
                }
            });
        }
    }
})
.directive("laudoEspera", function (CoordService) {
    console.log("laudo-espera");
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            setor: '=',
            area: '=',
            resposta: '=',
            confcheckespera: '='
        },
        link: function (scope, element, attr) {
            scope.$watch('confcheckespera', function (r) {
                if (r == true) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        // var id = scope.idos;
                        // var setor = scope.setor;
                        // var area = scope.area;
                        // var texto = scope.resposta;
                        // console.log(id);
                        // console.log(texto);

                        if (scope.idos != undefined && scope.resposta != undefined && scope.resposta != "") {
                            CoordService.esperaOs({id: scope.idos, setor: scope.setor, area: scope.area, texto: scope.resposta});
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
    console.log("laudo-andamento");
    return {
        restrict: 'A',
        scope: {
            idos: '=',
            setor: '=',
            area: '=',
            resposta: '=',
            confchecktiraespera: '='
        },
        link: function (scope, element, attr) {
            scope.$watch('confchecktiraespera', function (r) {
                if (r == true) {
                    element.on("click", function (e) {
                        e.preventDefault();
                        // var id = scope.idos;
                        // var setor = scope.setor;
                        // var area = scope.area;
                        // var texto = scope.resposta;
                        // console.log(id);
                        // console.log(texto);
                        if (scope.idos != undefined && scope.resposta != undefined && scope.resposta != "") {
                            CoordService.ativaOS({id: scope.idos, setor: scope.setor, area: scope.area, texto: scope.resposta});
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
    console.log("clear-notification");
    return {
        restrict: 'A',
        scope: {
            id: '='
        },
        link: function (s, e, a) {
            console.log(s.id);
            CoordService.clearNotification(s.id);
        }
    }

})
.directive("coordCarrega", function (CoordService) {
    console.log("carrega-coord");
    return {
        link: function (scope, element, attr) {
            CoordService.getCoord(scope);

            // element.on('change', function (e) {
            //     e.preventDefault();
            //     if (scope.tec.coord) {
            //     } else {
            //         scope.tec.setor = "";
            //         scope.tec.area = "";
            //     }

            //     if (scope.tec.grupo == "resp") {
            //         scope.tec.area = "";
            //     }
            // })
        }
    }
})
.directive("setorCarrega", function (CoordService) {
    console.log("carrega-setor");
    return {
        link: function (scope, element, attr) {
            element.on("focus", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (scope.tec.coord) {
                    console.log('click-setor');
                    CoordService.getSetorbycoord(scope.tec.coord, scope);
                }
            });


            // element.on('change', function (e) {
            //     e.preventDefault();
            //     CoordService.getAreabysetor(scope.tec.setor, scope);

            //     if (scope.tec.setor) {
            //     } else {
            //         scope.tec.area = "";
            //     }

            //     if (scope.tec.grupo == "resp") {
            //         scope.tec.area = "";
            //     }
            // })
        }
    }
})
.directive("areaCarrega", function (CoordService) {
    console.log("carrega-area");
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
//componentes
.component("login", {templateUrl: "/app/views/login.php", controller: "loginCtrl"})
.component("os", {templateUrl: "/app/views/app.php?v=os", controller: "osCtrl"})
.component("teste", {templateUrl: "/app/views/app.php?v=teste", controller: "testeCtrl"})
.component("criaros", {templateUrl: "/app/views/app.php?v=criaros", controller: "criarosCtrl"})
.component("criarossolic", {templateUrl: "/app/views/app.php?v=criarossolic", controller: "criarossolicCtrl"})
.component("criarosdest", {templateUrl: "/app/views/app.php?v=criarosdest", controller: "criarosdestCtrl"})
.component("criarosdescr", {templateUrl: "/app/views/app.php?v=criarosdescr", controller: "criarosdescrCtrl"})
.component("criartec", {templateUrl: "/app/views/app.php?v=criartec", controller: "criartecCtrl"})
.component("editeteclista", {templateUrl: "/app/views/app.php?v=editeteclista", controller: "editeteclistaCtrl", bindings: { verTecList: '<' }})
.component("editetec", {templateUrl: "/app/views/app.php?v=editetec", controller: "editetecCtrl", bindings: { tecid: '<' }})
.component("ver", {templateUrl: "/app/views/app.php?v=ver", controller: "verCtrl"})
.component("enviadavernova", {templateUrl: "/app/views/app.php?v=enviadavernova", controller: "enviadavernovaCtrl", bindings: { verOs: '<' }})
.component("enviadaverandamento", {templateUrl: "/app/views/app.php?v=enviadaverandamento", controller: "enviadaverandamentoCtrl", bindings: { verOs: '<' }})
.component("enviadaverespera", {templateUrl: "/app/views/app.php?v=enviadaverespera", controller: "enviadaveresperaCtrl", bindings: { verOs: '<' }})
.component("enviadaverencerrada", {templateUrl: "/app/views/app.php?v=enviadaverencerrada", controller: "enviadaverencerradaCtrl", bindings: { verOs: '<' }})
.component("infoenviadavernova", {templateUrl: "/app/views/app.php?v=infoenviadavernova", controller: "infoenviadavernovaCtrl", bindings: { osid: '<' }})
.component("infoenviadaverandamento", {templateUrl: "/app/views/app.php?v=infoenviadaverandamento", controller: "infoenviadaverandamentoCtrl", bindings: { osid: '<' }})
.component("infoenviadaverespera", {templateUrl: "/app/views/app.php?v=infoenviadaverespera", controller: "infoenviadaveresperaCtrl", bindings: { osid: '<' }})
.component("infoenviadaverencerrada", {templateUrl: "/app/views/app.php?v=infoenviadaverencerrada", controller: "infoenviadaverencerradaCtrl", bindings: { osid: '<' }})
.component("recebidavernova", {templateUrl: "/app/views/app.php?v=recebidavernova", controller: "recebidavernovaCtrl", bindings: { verOs: '<' }})
.component("recebidaverandamento", {templateUrl: "/app/views/app.php?v=recebidaverandamento", controller: "recebidaverandamentoCtrl", bindings: { verOs: '<' }})
.component("recebidaverespera", {templateUrl: "/app/views/app.php?v=recebidaverespera", controller: "recebidaveresperaCtrl", bindings: { verOs: '<' }})
.component("recebidaverencerrada", {templateUrl: "/app/views/app.php?v=recebidaverencerrada", controller: "recebidaverencerradaCtrl", bindings: { verOs: '<' }})
.component("inforecebidavernova", {templateUrl: "/app/views/app.php?v=inforecebidavernova", controller: "inforecebidavernovaCtrl", bindings: { osid: '<' }})
.component("inforecebidaverandamento", {templateUrl: "/app/views/app.php?v=inforecebidaverandamento", controller: "inforecebidaverandamentoCtrl", bindings: { osid: '<' }})
.component("inforecebidaverespera", {templateUrl: "/app/views/app.php?v=inforecebidaverespera", controller: "inforecebidaveresperaCtrl", bindings: { osid: '<' }})
.component("inforecebidaverencerrada", {templateUrl: "/app/views/app.php?v=inforecebidaverencerrada", controller: "inforecebidaverencerradaCtrl", bindings: { osid: '<' }})
.component("editenova", {templateUrl: "/app/views/app.php?v=editenova", controller: "editenovaCtrl", bindings: { osid: '<' }})
.component("editadalaudovernova", {templateUrl: "/app/views/app.php?v=editadalaudovernova", controller: "recebidavernovaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudonova", {templateUrl: "/app/views/app.php?v=infoeditadalaudonova", controller: "inforecebidavernovaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverandamento", {templateUrl: "/app/views/app.php?v=editadalaudoverandamento", controller: "recebidaverandamentoCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudoandamento", {templateUrl: "/app/views/app.php?v=infoeditadalaudoandamento", controller: "inforecebidaverandamentoCtrl", bindings: { osid: '<' }})
.component("editadalaudoverespera", {templateUrl: "/app/views/app.php?v=editadalaudoverespera", controller: "recebidaveresperaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudoespera", {templateUrl: "/app/views/app.php?v=infoeditadalaudoespera", controller: "inforecebidaveresperaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverencerrada", {templateUrl: "/app/views/app.php?v=editadalaudoverencerrada", controller: "recebidaverencerradaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudoencerrada", {templateUrl: "/app/views/app.php?v=infoeditadalaudoencerrada", controller: "inforecebidaverencerradaCtrl", bindings: { osid: '<' }})
.component("solicvernova", {templateUrl: "/app/views/app.php?v=solicvernova", controller: "solicvernovaCtrl", bindings: { verOs: '<' }})
.component("infosolicnova", {templateUrl: "/app/views/app.php?v=infosolicnova", controller: "infosolicnovaCtrl", bindings: { osid: '<' }})
.component("solicverandamento", {templateUrl: "/app/views/app.php?v=solicverandamento", controller: "solicverandamentoCtrl", bindings: { verOs: '<' }})
.component("infosolicandamento", {templateUrl: "/app/views/app.php?v=infosolicandamento", controller: "infosolicandamentoCtrl", bindings: { osid: '<' }})
.component("solicverespera", {templateUrl: "/app/views/app.php?v=solicverespera", controller: "solicveresperaCtrl", bindings: { verOs: '<' }})
.component("infosolicespera", {templateUrl: "/app/views/app.php?v=infosolicespera", controller: "infosolicesperaCtrl", bindings: { osid: '<' }})
.component("solicverencerrada", {templateUrl: "/app/views/app.php?v=solicverencerrada", controller: "solicverencerradaCtrl", bindings: { verOs: '<' }})
.component("infosolicencerrada", {templateUrl: "/app/views/app.php?v=infosolicencerrada", controller: "infosolicencerradaCtrl", bindings: { osid: '<' }})
.component("recebidaversecrnova", {templateUrl: "/app/views/app.php?v=recebidaversecrnova", controller: "recebidaversecrnovaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaversecrnova", {templateUrl: "/app/views/app.php?v=inforcebidaversecrnova", controller: "inforcebidaversecrnovaCtrl", bindings: { osid: '<' }})
.component("recebidaversecrandamento", {templateUrl: "/app/views/app.php?v=recebidaversecrandamento", controller: "recebidaversecrandamentoCtrl", bindings: { verOs: '<' }})
.component("inforcebidaversecrandamento", {templateUrl: "/app/views/app.php?v=inforcebidaversecrandamento", controller: "inforcebidaversecrandamentoCtrl", bindings: { osid: '<' }})
.component("recebidaversecrespera", {templateUrl: "/app/views/app.php?v=recebidaversecrespera", controller: "recebidaversecresperaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaversecrespera", {templateUrl: "/app/views/app.php?v=inforecebidaversecrespera", controller: "inforcebidaversecresperaCtrl", bindings: { osid: '<' }})
.component("recebidaversecrencerrada", {templateUrl: "/app/views/app.php?v=recebidaversecrencerrada", controller: "recebidaversecrencerradaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaversecrencerrada", {templateUrl: "/app/views/app.php?v=inforcebidaversecrencerrada", controller: "inforcebidaversecrencerradaCtrl", bindings: { osid: '<' }})
//.component("editadalaudoversecrnova", {templateUrl: "/app/views/app.php?v=editadalaudoversecrnova", controller: "editadalaudoversecrnovaCtrl", bindings: { verOs: '<' }})
//.component("infoeditadalaudosecrnova", {templateUrl: "/app/views/app.php?v=infoeditadalaudosecrnova", controller: "infoeditadalaudosecrnovaCtrl", bindings: { osid: '<' }})
//.component("editadalaudoversecrandamento", {templateUrl: "/app/views/app.php?v=editadalaudoversecrandamento", controller: "editadalaudoversecrandamentoCtrl", bindings: { verOs: '<' }})
//.component("infoeditadalaudosecrandamento", {templateUrl: "/app/views/app.php?v=infoeditadalaudosecrandamento", controller: "infoeditadalaudosecrandamentoCtrl", bindings: { osid: '<' }})
//.component("editadalaudoversecrespera", {templateUrl: "/app/views/app.php?v=editadalaudoversecrespera", controller: "editadalaudoversecresperaCtrl", bindings: { verOs: '<' }})
//.component("infoeditadalaudosecrespera", {templateUrl: "/app/views/app.php?v=infoeditadalaudosecrespera", controller: "infoeditadalaudosecresperaCtrl", bindings: { osid: '<' }})
//.component("editadalaudoversecrencerrada", {templateUrl: "/app/views/app.php?v=editadalaudoversecrencerrada", controller: "editadalaudoversecrencerradaCtrl", bindings: { verOs: '<' }})
//.component("infoeditadalaudoencerrada", {templateUrl: "/app/views/app.php?v=infoeditadalaudoencerrada", controller: "infoeditadalaudoencerradaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespnova", {templateUrl: "/app/views/app.php?v=recebidaverrespnova", controller: "recebidaverrespnovaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaverrespnova", {templateUrl: "/app/views/app.php?v=inforcebidaverrespnova", controller: "inforcebidaverrespnovaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespandamento", {templateUrl: "/app/views/app.php?v=recebidaverrespandamento", controller: "recebidaverrespandamentoCtrl", bindings: { verOs: '<' }})
.component("inforcebidaverrespandamento", {templateUrl: "/app/views/app.php?v=inforcebidaverrespandamento", controller: "inforcebidaverrespandamentoCtrl", bindings: { osid: '<' }})
.component("recebidaverrespespera", {templateUrl: "/app/views/app.php?v=recebidaverrespespera", controller: "recebidaverrespesperaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaverrespespera", {templateUrl: "/app/views/app.php?v=inforcebidaverrespespera", controller: "inforcebidaverrespesperaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespencerrada", {templateUrl: "/app/views/app.php?v=recebidaverrespencerrada", controller: "recebidaverrespencerradaCtrl", bindings: { verOs: '<' }})
.component("inforcebidaverrespencerrada", {templateUrl: "/app/views/app.php?v=inforcebidaverrespencerrada", controller: "inforcebidaverrespencerradaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespnova", {templateUrl: "/app/views/app.php?v=editadalaudoverrespnova", controller: "editadalaudoverrespnovaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespnova", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespnova", controller: "infoeditadalaudorespnovaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespandamento", {templateUrl: "/app/views/app.php?v=editadalaudoverrespandamento", controller: "editadalaudoverrespandamentoCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespandamento", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespandamento", controller: "infoeditadalaudorespandamentoCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespespera", {templateUrl: "/app/views/app.php?v=editadalaudoverrespespera", controller: "editadalaudoverrespesperaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespespera", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespespera", controller: "infoeditadalaudorespesperaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespencerrada", {templateUrl: "/app/views/app.php?v=editadalaudoverrespencerrada", controller: "editadalaudoverrespencerradaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespencerrada", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespencerrada", controller: "infoeditadalaudorespencerradaCtrl", bindings: { osid: '<' }})
.component("recebidavertecnova", {templateUrl: "/app/views/app.php?v=recebidavertecnova", controller: "recebidavertecnovaCtrl", bindings: { verOs: '<' }})
.component("inforcebidavertecnova", {templateUrl: "/app/views/app.php?v=inforcebidavertecnova", controller: "inforcebidavertecnovaCtrl", bindings: { osid: '<' }})
.component("recebidavertecandamento", {templateUrl: "/app/views/app.php?v=recebidavertecandamento", controller: "recebidavertecandamentoCtrl", bindings: { verOs: '<' }})
.component("inforcebidavertecandamento", {templateUrl: "/app/views/app.php?v=inforcebidavertecandamento", controller: "inforcebidavertecandamentoCtrl", bindings: { osid: '<' }})
.component("recebidavertecespera", {templateUrl: "/app/views/app.php?v=recebidavertecespera", controller: "recebidavertecesperaCtrl", bindings: { verOs: '<' }})
.component("inforcebidavertecespera", {templateUrl: "/app/views/app.php?v=inforcebidavertecespera", controller: "inforcebidavertecesperaCtrl", bindings: { osid: '<' }})
.component("recebidavertecencerrada", {templateUrl: "/app/views/app.php?v=recebidavertecencerrada", controller: "recebidavertecencerradaCtrl", bindings: { verOs: '<' }})
.component("inforcebidavertecencerrada", {templateUrl: "/app/views/app.php?v=inforcebidavertecencerrada", controller: "inforcebidavertecencerradaCtrl", bindings: { osid: '<' }})
.component("editadalaudovertecnova", {templateUrl: "/app/views/app.php?v=editadalaudovertecnova", controller: "editadalaudovertecnovaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudotecnova", {templateUrl: "/app/views/app.php?v=infoeditadalaudotecnova", controller: "infoeditadalaudotecnovaCtrl", bindings: { osid: '<' }})
.component("editadalaudovertecandamento", {templateUrl: "/app/views/app.php?v=editadalaudovertecandamento", controller: "editadalaudovertecandamentoCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudotecandamento", {templateUrl: "/app/views/app.php?v=infoeditadalaudotecandamento", controller: "infoeditadalaudotecandamentoCtrl", bindings: { osid: '<' }})
.component("editadalaudovertecespera", {templateUrl: "/app/views/app.php?v=editadalaudovertecespera", controller: "editadalaudovertecesperaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudotecespera", {templateUrl: "/app/views/app.php?v=infoeditadalaudotecespera", controller: "infoeditadalaudotecesperaCtrl", bindings: { osid: '<' }})
.component("editadalaudovertecencerrada", {templateUrl: "/app/views/app.php?v=editadalaudovertecencerrada", controller: "editadalaudovertecencerradaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudotecencerrada", {templateUrl: "/app/views/app.php?v=infoeditadalaudotecencerrada", controller: "infoeditadalaudotecencerradaCtrl", bindings: { osid: '<' }})
.component("sobre", {templateUrl: "/app/views/app.php?v=sobre", controller: "sobreCtrl"})
.component("contato", {templateUrl: "/app/views/app.php?v=contato", controller: "contatoCtrl"})

// .component('dashboard', {
//     templateUrl: '/app/views/dashboard.php',
//     controller: 'dashboardCtrl'
// })




.component('verOsid', {
    bindings: { osid: '<' },
    template: '<div>Nome : {{$ctrl.osid.sNome}}</div>' +
    '<div><a ui-sref="dashboard.os.verosuni({ osID : $ctrl.osid.id })" ui-sref-active="active">Ver todos os detalhes</a></div>' +
   '<button ui-sref="dashboard.os.ver.os">Fechar</button>',
})
.component('verOsAdmin', {
    templateUrl: '/app/views/ver-osAdmin.php'
})
.component('verOsCoord', {
    templateUrl: '/app/views/ver-osCoord.php'
})
.component('verOs', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os.php',
    controller: 'verOsCtrl' // mudança 23/11/2018
})
/*
.component('verOsNovas', { // não está mais em funcionamento
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-novas.php',
    controller: 'verOsCtrl' // mudança 23/11/2018
})*/
// views lists
.component('verOsNovas', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-novas.php',
})
.component('verOsAndamento', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-andamento.php',
})
.component('verOsEncerrada', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-encerrada.php',
})
.component('verOsTecnicoNovas', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-tecnico-novas.php',
})
.component('verOsTecnicoAndamento', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-tecnico-andamento.php',
})
.component('verOsTecnicoEncerrada', {
    bindings: { verOs: '<' },
    templateUrl: '/app/views/ver-os-tecnico-encerrada.php',
}) // info os
.component('verOsInfoTecnico', {
    bindings: { osid: '<' },
    templateUrl: '/app/views/ver-osinfo-tecnico.php',
    controller : 'verOsidCtrl'
})
.component('verOsInfoNovas', {
    bindings: { osid: '<' },
    templateUrl: '/app/views/ver-osinfo-novas.php',
    controller : 'verOsidCtrl'
})
.component('verOsInfoAndamento', {
    bindings: { osid: '<'},
    templateUrl: '/app/views/ver-osinfo-andamento.php'
})
.component('verOsInfoEncerrada', {
    bindings: { osid: '<'},
    templateUrl: '/app/views/ver-osinfo-encerrada.php'
})
.component('verOsInfoTecnicoNovas', {
    bindings: { osid: '<'},
    templateUrl: '/app/views/ver-osinfo-tecnico-novas.php'
})
.component('verOsInfoTecnicoAndamento', {
    bindings: { osid: '<'},
    templateUrl: '/app/views/ver-osinfo-tecnico-andamento.php'
})
.component('verOsInfoTecnicoEncerrada', {
    bindings: { osid: '<'},
    templateUrl: '/app/views/ver-osinfo-tecnico-encerrada.php'
})
.component('verOsedit', {
    bindings: { osid: '<' },
    templateUrl: '/app/views/ver-osinfo-edit.php',
    controller : 'verOseditCtrl',
    //require : { container : '^^verOseditCtrl'} // 11/12/2018
})
.component('verOsfile', { // não mais usada
    bindings: { osid: '<' },
    templateUrl: '/app/views/ver-osfile.php', // não necessária
})
.component('verOsSetor', {
    templateUrl: '/app/views/ver-osSetor.php'
})
.component('verOsSolicitante', {
    templateUrl: '/app/views/ver-osSolicitante.php'
})
.component('verOsTecnico', {
    templateUrl: '/app/views/ver-osTecnico.php'
})

.component('download', { // pode remover
    templateUrl : '/app/data/downloadFile.php?file',
    controller : function ($stateParams) {
        expect($stateParams).toBe({filename});
    }
})

// controles
.controller("loginCtrl", function($rootScope, $scope, $state, $http, $location, $timeout, ngProgressFactory, loginService) { // mofificar depois
    $scope.location = $location.path();

    $scope.login = function(user) {
        //user['password'] = md5(user['password']);
        loginService.login(user, $scope, $rootScope);

        console.log(user.username);
    }

    $scope.clearMsg = function() {
        $scope.errorLogin = false;
    }
})
.controller('dashboardCtrl', function($scope, loginService, loginSessionService, ngProgressFactory, $timeout, $state, $window) {
    // body...
    //$scope.ver = "OI!!";
    /* efeito no menu scroll down and up */
    var prevScrpos = $window.pageYOffset;
    $window.onscroll = function () {
        var currScrpos = $window.pageYOffset;
        if (prevScrpos > currScrpos) {
            angular.element("#navmenu").css('visibility', 'visible');
            angular.element("#navmenu").css('z-index', '100');
            //angular.element("#painelmenu").css('position', 'relative');
            angular.element("#painelmenu").css('opacity', '0');
            //angular.element("#content").css('top', '4rem');
            angular.element("#bottonangleup").css('opacity', '0');
        } else {
            angular.element("#navmenu").css('visibility', "hidden");
            angular.element("#navmenu").css('z-index', '99');
            angular.element("#painelmenu").css('opacity', '1');
            //angular.element("#painelmenu").css('position', 'fixed');
            //angular.element("#content").css('top', '0');
            angular.element("#bottonangleup").css('opacity', '1');
        }
        prevScrpos = currScrpos;
    }

    $scope.logout = function() {
        loginService.logout();
    }

    var promise = loginSessionService.getUser(); // ver login session service
    promise.then (function (resp) {
        //console.log(resp);
        //console.log(resp.nome);
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

    //var str = $scope.dataUser.nome;
    //var nome = str.split(" ", 2);
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

    //$scope.files = [];
    $scope.service = {}; // dados guardados em service do scope
    var dados = {}; // dados guardados em dados

    //var Descr_Topic = $scope.service.descr_topic;

    //if (Descr_Topic != undefined) {
    //    if (Descr_Topic.length == 50) {
    //        toaster.pop("info", "Informação:", "Limite de caracters para o tópico de Descrição", 10000, 'trustedHtml');
    //    }
    //}

    // função que criar e verifica se os dados estão preenchidos
    $scope.criarOS = function(scope) {
        // não enviar com campos faltando, verificar campos abaixo
        // escrever os alertas embaixo dos campos
        dados['sol_ala'] = ""; // guarda dado de solicitante area como se tivesse vazio. solicitante area é uma opção.
        dados['sol_sala'] = ""; // guarda dado de solicitante sala como se tivesse vazio. solicitante sala é uma opção.
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
        // if ($scope.service.sol_setor == undefined) {
        //     toaster.pop('info', "Informação:", "Preencha o Campo de Setor no solicitante", 10000, 'trustedHtml');
        //     //alert("Preencha o campo de setor do solicitante");
        //     return;
        // }
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
        if ($scope.service.dest_setor == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Setor na Destinação", 10000, 'trustedHtml');
            //alert("Preencha o campo de setor para a destinação");
            return;
        }
        if ($scope.service.dest_area == undefined) {
            toaster.pop('info', "Informação:", "Preencha o Campo de Area na Destinação", 10000, 'trustedHtml');
            //alert("Preencha o campo de area para a destinação");
            return;
        }
        if ($scope.service.descr_topic == undefined) {
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
        // dados['sol_setor'] = $scope.service.sol_setor; // guarda dado do setor do solicitante do scope de sol_setor em sol_setor da variavel dados
        if ($scope.service.sol_ala) {
            dados['sol_ala'] = $scope.service.sol_ala; // guarda dado do ala do solicitante do scope de sol_ala em sol_ala da variavel dados
        }
        if ($scope.service.sol_sala) {
            dados['sol_sala'] = $scope.service.sol_sala; // guarda dado do sala do solicitante do scope de sol_sala em sol_sala da variavel dados
        }
        dados['sol_ramal'] = $scope.service.sol_ramal; // guarda dado do ramal do solicitante do scope de sol_ramal em sol_ramal da variavel dados
        dados['dest_coord'] = $scope.service.dest_coord; // guarda dado do coordenação do destino do scope de dest_coord em dest_coord da variavel dados
        dados['dest_setor'] = $scope.service.dest_setor; // guarda dado do setor do destino do scope de dest_setor em dest_setor da variavel dados
        dados['dest_area'] = $scope.service.dest_area; // guarda dado do area do destino do scope de dest_area em dest_area da variavel dados
        dados['descr_topic'] = $scope.service.descr_topic; // guarda dado do topico de descrição do scope de descr_topic em descr_topic da variável dados
        dados['descr'] = $scope.service.descr; // guarda dado do descrição do descrição do scope de descr em descr da variavel dados


        //var arquivo;
        //console.log(dados);
        //

        //console.log(scope.files);
        scope.buttonShow = false;

        if (scope.files != undefined) {
            //console.log(scope.files);
            var promise = CoordService.enviarFile(scope);
            promise.then(function(resp) {
                console.log(resp); // resposta do servidor para arquivo enviado para o servidor sim ou não ?(OK ou erro)
                /*
                if (resp) {
                    if (resp = "igual") {
                        toaster.pop('info', "Informação:", "Nomei Com um titulo diferente", 10000, 'trustedHtml');
                    }
                    else {
                        dados['arq'] = resp;
                        CoordService.postCriarOS(dados);
                        toaster.pop('info', "Informação:", "Ordem de Serviço enviada", 10000, 'trustedHtml');
                        $state.go('dashboard.os.ver.os');
                    }
                    //alert("arquivo enviado");
                    //dados['arq'] = resp;
                    //CoordService.postCriarOS(dados);
                } else {
                    alert("arquivo não enviado");
                }
                */
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
                    //alert("arquivo enviado");
                    //dados['arq'] = resp;
                    //CoordService.postCriarOS(dados);
                } else {
                    toaster.pop('error', "Erro ao enviar arquivo. Arquivo não enviado!", 10000, 'trustedHtml');
                }
            });
        } else {
            dados['arq'] = "";
            CoordService.postCriarOS(dados);
            $state.go('dashboard.os'); // 03/02
        }
        //console.log(dados);


    }

    //CoordService.getCoord();
})
.controller('criarossolicCtrl', function($scope, CoordService) {
    // controle de solicitante para criação da ordem de serviço
    CoordService.getCoord($scope);

    // $scope.coordInput = function (coord) {
    //     //
    //     if (coord == "") {
    //         $scope.$parent.service.sol_setor = "";
    //         console.log("Coordenação vazia!");
    //     } else {
    //         CoordService.getSetorbycoord(coord, $scope);
    //         console.log("Coordenação incluída!");
    //     }
    // }
    // correção para que não apareça mais o setor do solicitante de deixar mais geral sua coordenação 03/02
    // $scope.setorInput = function (setor) {
    //     //
    // }

    // $scope.setorByCoord = function(coord) {
    //     if (coord == "") {
    //         $scope.$parent.service.sol_setor = "";
    //         console.log("Coordenação vazia!");
    //     } else {
    //         CoordService.getSetorbycoord(coord, $scope);
    //         console.log("Coordenação incluída!");
    //     }
    // }

    // if ($scope.$parent.service.sol_setor) {
    //     CoordService.getSetorbycoord($scope.$parent.service.sol_coord, $scope);
    // }
})
.controller('criarosdestCtrl', function($scope, CoordService) {
    // controle de destino para criação da ordem de serviço
    CoordService.getCoord($scope);

    if ($scope.$parent.service.dest_coord) {
        $scope.showSetor = true; // mostra setores
        CoordService.getSetorbycoord($scope.$parent.service.dest_coord, $scope); // puxa setores
        console.log("Têm coordenação selecionada");
    }

    if ($scope.$parent.service.dest_setor) {
        $scope.showArea = true; // mostra areas
        CoordService.getAreabysetor($scope.$parent.service.dest_setor, $scope); // puxa areas
        console.log("Têm setor selecionado");
    }

    $scope.setorByCoord = function(coord) { // função para encontrar setores pela coordenação selecionada
        if (coord == "") { // verifica se coordenação selecionada está vazia
            $scope.showSetor = false; // escode setor
            $scope.showArea = false; // escode area
            $scope.$parent.service.dest_setor = ""; // limpa campo de setor
            $scope.$parent.service.dest_area = ""; // limpa campo de area
        } else {
            $scope.showSetor = true; // mostra setores
            CoordService.getSetorbycoord(coord, $scope); // puxa setores
        }
    }

    $scope.areaBySetor = function(setor) { // função para encontrar areas pelo setor seleciondo
        if (setor == "") { // verifica se o setor selecionado está vazio
            $scope.showArea = false; // escode area
            $scope.$parent.service.dest_area = ""; // limpa o campo de area
        } else {
            $scope.showArea = true; // mostra areas
            CoordService.getAreabysetor(setor, $scope); // puxa areas
        }
    }
})
.controller('criarosdescrCtrl', function($scope, toaster) {
    //controle da pagina de descrição para cria da ordem de serviço

    var inputfile = document.getElementById("inputfile"); // pega o id do arquivo para upload

    $scope.$parent.buttonShow = true;

    inputfile.onchange = function (e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.target.files;
        console.log(files);
        $scope.$apply(function () { // carrega o aquivo em uma variável
            $scope.$parent.files = [];
            $scope.$parent.files.push(files[0]);
            $scope.$parent.progressVisible = false;
        });
    }

    $scope.limitCharTopic = function (str) { // verifica o tópico para descrição e laudo comprimento de frase por caracter, pode ser mudado por a introdução de serviços padrões
        if (str.length == 80) {
            toaster.pop("info", "Informação:", "Limite de 80 caracters para o tópico de Descrição", 10000, 'trustedHtml');
        }
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
    //OrdemService.getOrdensbyCoord($scope);
    //$rootScope.toaster-options; "{'position-class' : 'toast-top-center'}";
    //toasterConfig['position-class'] = 'toast-top-center';
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

    $scope.verInfoOS = function(id) { // não mais usado
        console.log(id);
        var html = "";

        var promise = OrdemService.getOrdem(id);

        promise.then(function(ordem) {
            console.log(ordem);
            /*
            var date_create = new Date(ordem.data_in);
            var day_create = date_create.getDate();
            var month_create = date_create.getMonth() + 1;
            var year_create = date_create.getFullYear();
            var hour_create = date_create.getHours();
            var minute_create = date_create.getMinutes();
            var secund_create = date_create.getSeconds();
            var date_modification = new Date(ordem.data_up);
            var day_modification = date_modification.getDate();
            var month_modification = date_modification.getMonth() + 1;
            var year_modification = date_modification.getFullYear();
            var hour_modification = date_modification.getHours();
            var minute_modification = date_modification.getMinutes();
            var secund_modification = date_modification.getSeconds();
            var zero_create = "";
            var zero_modification = "";

            //var solicitante = ordem.solicitante.split(" ", 2);

            if (secund_create < 10) {
                zero_create = 0;
            }

            if (secund_modification < 10) {
                zero_modification = 0;
            }
            */

            html = html + "<div>Nº : " + ordem.n_os + "</div>";
            html = html + "<div class=\"display-os\"><b>Criação : &nbsp;</b>";
            html = html + "<div><span>" + ordem.data_in + "</span></div></div>&nbsp;&nbsp;";
            //html = html + "<div><span>" + day_create + "/" + month_create + "/" + year_create + "&nbsp;&nbsp;</span></div>";
            //html = html + "<span>" + hour_create + ":" + minute_create + ":" + zero_create + secund_create + "&nbsp;&nbsp;</span></div></div>";
            html = html + "<div class=\"display-os\"><b>Modicação : &nbsp;</b>";
            html = html + "<div><span>" + ordem.data_up + "</span></div></div>";
            //html = html + "<div><span>" + day_modification + "/" + month_modification + "/" + year_modification + "&nbsp;&nbsp;</span></div>";
            //html = html + "<div><span>" + hour_modification + ":" + minute_modification + ":" + zero_modification + secund_modification + "&nbsp;&nbsp;</span></div></div>";
            html = html + "<br><b>Solicitante info : &nbsp;</b>";
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


            // "toaterId - identifica qual o id do toaster para cada toaster-container que fica configurada em toaster-options. Ex.: toaster-options={'toasterId': 'info-order-service'}
            toaster.pop({ type: 'toast', title: "Informação OS", body: html, bodyOutputType: 'trustedHtml', timeOut: 20000, toasterId: "info-order-service", showCloseButton: true }); //'toast', "Informação:", html, 10000, 'trustedHtml');
        })
    }
})
.controller('editeteclistaCtrl', function () {})
.controller('verOsidCtrl', function ($scope, $window, $state, $stateParams, CoordService) {
    var origin = window.location.origin;
    //$scope.arquivo = "Polimorfismo.pdf";
    //$scope.getFile = function (filePath) {
        //Download.getFile(filePath);
    //}

    $scope.recarregar = function () { // já existe uma directive para isso
        //$state.transitionTo($state.current, $state.params, {reload: true, inherit: true, notify: true});
        //window.location.reload();
        $state.reload($state.current);
    }

    $scope.linkFile = function (file) { // já existe uma diretictive para isso
        //$window.open(origin + "/anexos/" + url);
        //CoordService.downloadFile(file);
        location.assign(origin + '/app/data/downloadFile.php?file=' + file); // verifica o nome do arquivo
    }
})
.controller('criartecCtrl', function ($scope, CoordService, toaster) {
    CoordService.getCoord($scope);

    $scope.changeCoord = function (coord) {
        CoordService.getSetorbycoord($scope.tec.coord, $scope);
        $scope.tec.setor = "";
        $scope.tec.area = "";
    }
    $scope.changeSetor = function (setor) {
        CoordService.getAreabysetor($scope.tec.setor, $scope);

        $scope.tec.area = "";

    }

    $scope.criarUser = function (lista) {
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
              if ($scope.tec.setor) {}
              else {
                toaster.pop('warning', "","preencha o campo do setor!", 3000, 'trustedHtml');
                flag = false;
              }
              if ($scope.tec.area) {}
              else {
                toaster.pop('warning', "","preencha o campo da area!", 3000, 'trustedHtml');
                flag = false;
              }
            break;
          case 'resp':
            if ($scope.tec.setor) {}
            else {
              toaster.pop('warning', "","preencha o campo do setor!", 3000, 'trustedHtml');
              flag = false;
            }
            break;

        }
        if (flag) {
          console.log(lista);
          CoordService.criarUser(lista);
        }
      } else {
        toaster.pop('warning', "", "preencha os campos", 3000, 'trustedHtml');
      }

    }
})
.controller('editetecCtrl', function ($scope, CoordService) {
    CoordService.getCoord($scope);

    $scope.changeCoord = function (coord) {
        $scope.coord = coord;
        CoordService.getSetorbycoord($scope.coord, $scope);
        $scope.setor = "";
        $scope.area = "";
    }
    $scope.changeSetor = function (setor) {
        $scope.setor = setor;
        CoordService.getAreabysetor($scope.setor, $scope);
        $scope.area = "";
    }
    $scope.changeArea = function (area) {
        $scope.area = area;
        console.log($scope.area);
    }
    $scope.copy = function () {
        $scope.user = $scope.$ctrl.tecid.user;
        $scope.nome = $scope.$ctrl.tecid.nome;
        $scope.ala = $scope.$ctrl.tecid.ala;
        $scope.sala = $scope.$ctrl.tecid.sala;
        $scope.ramal = $scope.$ctrl.tecid.ramal;
    }

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
        if ($scope.coord) {}
        else {
          alert("preencha o campo da coordenação!");
          flag = false;
        }
        switch ($scope.grupo) {
          case 'tec':
              if ($scope.setor) {}
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
            if ($scope.setor) {}
            else {
              alert("preencha o campo do setor!");
              flag = false;
            }
            break;

        }
        if (flag) {
          console.log(lista);
        }

        //CoordService.editeUser(lista);
    }
})
.controller('recebidavernovaCtrl', function () {})
.controller('recebidaverandamentoCtrl', function () {})
.controller('recebidaveresperaCtrl', function () {})
.controller('recebidaverencerradaCtrl', function () {})
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
.controller('verOseditCtrl', function ($scope, $state, CoordService, toaster) { // 03/02
    // controle da página de edição de novas ordem de serviços
    //$scope.$ctrl.osid = {};
    //$scope.solicitante = "";

    //var dados = {};
    // area do Solicitante edição
    //console.log($scope.coord);
    //console.log($scope.$ctrl.osid);

    // os dados de informação estão em : $scope.$ctrl

    var input = document.getElementById("inputfile");

    $scope.buttonShow = true;

    // CoordService.getCoordSolic($scope);
/*
    if ($scope.coord == "") {
        console.log("vazio")
    } else {
        console.log($scope.coord);
        CoordService.getSetorbycoordSolic($scope.coord, $scope);
    }
*/
    // $scope.coordInputSolic = function (coord) { // não necessária - onblur (perda de foco)
    //     //
    //     CoordService.getSetorbycoordSolic(coord, $scope);
    //     console.log("Coordenação incluída!");

    // }

    // $scope.setorByCoordSolic = function(coord) {
    //     CoordService.getSetorbycoordSolic(coord, $scope);
    //     console.log("Coordenação incluída!");
    // }
    //area da destinação edição
    // CoordService.getCoord($scope);

    // $scope.coordInput = function (coord) { // não necessária - onblur (perda de foco)
    //     //
    //     //if (coord == "") {
    //         //$scope.editService.dest_setor = "";
    //         //$scope.editService.dest_area = "";
    //         //console.log("Coordenação vazia!");
    //     //} else {
    //         CoordService.getSetorbycoord(coord, $scope);
    //         //console.log("Coordenação incluída!");
    //     //}
    // }

    // $scope.setorByCoord = function(coord) { // função para encontrar setores pela coordenação selecionada
    //     //if (coord == "") { // verifica se coordenação selecionada está vazia
    //         //$scope.showSetor = false; // escode setor
    //         //$scope.showArea = false; // escode area
    //         //$scope.editService.dest_setor = ""; // limpa campo de setor
    //         //$scope.editService.dest_area = ""; // limpa campo de area
    //     //} else {
    //         //$scope.showSetor = true; // mostra setores
    //         CoordService.getSetorbycoord(coord, $scope); // puxa setores
    //     //}
    // }

    // $scope.setorInput = function(setor) {
    //     //$scope.editService.dest_area = "";

    //     CoordService.getAreabysetor(setor, $scope);

    // }

    // $scope.areaBySetor = function(setor) { // função para encontrar areas pelo setor seleciondo
    //     // verifica se o setor selecionado está vazio
    //     //$scope.showArea = false; // escode area
    //     //$scope.editService.dest_area = ""; // limpa o campo de area

    //     //$scope.showArea = true; // mostra areas
    //     CoordService.getAreabysetor(setor, $scope); // puxa areas

    // }

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
        console.log(editOs);

        $scope.buttonShow = false;

        if ($scope.buttonbox) {
            //var input = document.getElementById("inputfile");
            var promise = CoordService.enviarFile($scope);
            promise.then(function(resp) {
                console.log(resp); // resposta do servidor para arquivo enviado para o servidor sim ou não ?(OK ou erro)
                if (resp) {
                    if (resp == "erro") {
                        console.log("erro");
                        toaster.pop('info', "Informação:", "Não é possivel enviar o arquivo no momento, por favor tente denovo!", 10000, 'trustedHtml');
                    }
                    else {
                        editOs.file = resp;
                        CoordService.editOsNova(editOs);
                        //toaster.pop('info', "Informação:", "Ordem de Serviço enviada", 10000, 'trustedHtml');
                        $state.go("dashboard.os.ver.os");
                        console.log("OK");
                    }
                    //alert("arquivo enviado");
                    //dados['arq'] = resp;
                    //CoordService.postCriarOS(dados);
                } else {
                    toaster.pop('error', "Erro ao enviar arquivo. Arquivo não enviado!", 10000, 'trustedHtml');
                    console.log("erro de script");
                }
            });
        } else {
            CoordService.editOsNova(editOs);
            //toaster.pop('info', "Informação:", "Ordem de Serviço enviada", 10000, 'trustedHtml');
            $state.go("dashboard.os.ver.os");
            console.log("arquivo não enviado");
        }


        //console.log($scope.editReturn);
    }

    // $scope.changeFile = function (file) {
        // $scope.file = file;
    // }

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

    console.log($scope.editService);

})
.controller("testeCtrl", function($scope, CoordService) {
    $scope.enviar = function (arq, nome) {
        CoordService.enviarArq(arq, nome);
    }

    $scope.download = function (file) {
        //$scope.progress = 0;
        //$scope.progress = 0;
        //CoordService.downloadFile(file);
        location.assign('http://192.168.4.105/app/data/downloadFile.php?file=' + file);
    }


    var dropbox = document.getElementById("dropbox");
    var inputfiles = document.getElementById("fileToUpload");

    $scope.dropText = 'Coloque o arquivo aqui';

    // inicial event handlers
    /*
    function dragEnterLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        $scope.$apply(function () {
            $scope.dropText = 'Coloque o arquivo aqui';
            $scope.dropClass = '';
        })
    }

    dropbox.ondragenter = dragEnterLeave;
    dropbox.ondragleave = dragEnterLeave;

    dropbox.ondragover = function (e) {
        //console.log('drop evento:', JSON.parse(JSON.stringify(e.dataTransfer)));
        e.stopPropagation();
        e.preventDefault();
        var clazz = 'not-available';
        var ok = e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf('Files') >= 0;
        $scope.$apply(function () {
            $scope.dropText = ok ? 'Coloque o arquivo aqui' : 'Somente arquivos são permitidos!';
            $scope.dropClass = ok ? 'over' : 'not-available';
        });
    };

    dropbox.ondrop = function (e) {
        console.log('drop evento:', JSON.parse(JSON.stringify(e.dataTransfer)));
        e.stopPropagation();
        e.preventDefault();
        $scope.$apply(function () {
            $scope.dropText = "Coloque o aquivo aqui";
            $scope.dropClass = "";
        });
        var files = e.dataTransfer.files;
        console.log(files);
        if (files.length > 0) {
            $scope.$apply(function () {
                $scope.files = [];
                $scope.files.push(files[0]);
                // para multi arquivos
                //
                //for (var i = 0; i < files.length; i++) {
                //    console.log(files[i]);
                //    $scope.files.push(files[i]);
                //}
            });
        }
    };
    */

    inputfiles.onchange = function(e) {
        //console.log('drop evento:', e.target.files);
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files;
        console.log(files);
        $scope.$apply(function () {
            $scope.files = [];
            $scope.files.push(files[0]);
            /*
            for (var i = 0; i < files.length; i++) {
                $scope.files.push(files[i]);
            }*/
            $scope.progressVisible = false;
        });
    };

    $scope.uploadFile = function() {
        CoordService.enviarFiles($scope);
    }
})

// serviços
.service('CoordService', function($http, toaster, $q) {
    return {
        getCoord: function($scope) {
            $http.get("/app/data/app.php?d=dataCoord").then(function(resp) {
                console.log(resp.data);
                $scope.coorddados = resp.data;
            });
        },
        getSetorbycoord: function(coord, $scope) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=dataSetor", { "coord": coord }).then(function(resp) {
                console.log(resp.data);
                $scope.setordados = resp.data;
                resolve.resolve(resp.data);
            });

            return resolve.promise;
        },
        getAreabysetor: function(setor, $scope) {
            $http.post("/app/data/app.php?d=dataArea", { "setor": setor }).then(function(resp) {
                console.log(resp.data);
                $scope.areadados = resp.data;
            });
        },
        getCoordSolic: function($scope) {
            $http.get("/app/data/app.php?dataCoord").then(function(resp) {
                console.log(resp.data);
                $scope.coorddadosSolic = resp.data;
            });
        },
        getSetorbycoordSolic: function(coord, $scope) {
            $http.post("/app/data/app.php?d=dataSetor", { "coord": coord }).then(function(resp) {
                console.log(resp.data);
                $scope.setordadosSolic = resp.data;
            });
        },
        postCriarOS: function(service) {
            $http.post("/app/data/app.php?d=criarOS", service).then(function(resp) {
                console.log(resp.data);
            });
        },
        criarUser: function(data) {
            $http.post("/app/data/app.php?d=criarUserOS", data)
            .then(function (resp) {
                console.log(resp.data);
                toaster.pop('info', "", resp.data, 10000, 'trustedHtml');
            });
        },
        enviarFile: function($scope) {
            console.log($scope.files);
            var formData = new FormData();
            formData.append("arquivo", $scope.files[0]);
            //console.log(fileFormData);
            $scope.progressVisible = true;
            return $http.post("/app/data/app.app?upload", formData, {
                transformRequest: angular.identify,
                headers: { 'Content-Type': undefined },
                params : {formData},
                //responseType: 'arraybuffer',
                uploadEventHandlers : {
                    progress : function (e) {
                        //console.log("evento progress");
                        if (e.lengthComputable) {
                            $scope.progress = Math.round(e.loaded * 100 / e.total);
                            //if ($scope.progress == 100) {
                            //    $scope.progressVisible = false;
                            //}
                        } else {
                            $scope.progress = "Não foi possivel carregar arquivo";
                        }
                    },
                    load : function (e) {
                        //console.log('completo');
                        toaster.pop('info', "", "Arquivo Carregado", 10000, 'trustedHtml');
                    },
                    error : function (e) {
                        console.log("evento error");
                        toaster.pop('error', "", "Erro ao carregar arquivo", 1000, 'trustedHtml');
                    },
                    abort : function (e) {
                        console.log('evento abort');
                        $scope.progressVisible = false;
                        toaster.pop('info', "", "O envio foi cancelado", 10000, 'trustedHtml');
                    }
                }
            }).then(function(resp) {
                return resp.data;
            });
        },
        editOsNova: function(os) {
            $http.post("/app/data/app.php?d=editarOS", os).then (function (resp) {
                console.log(resp.data);
                if (resp.data.error) {
                    toaster.pop('error', "", resp.data.message, 10000, 'trustedHtml');
                } else {
                    toaster.pop('info', "", resp.data.message, 10000, 'trustedHtml');
                }
            });
        },
        enviarArq : function($file, $nome) {
            var formdata = new FormData();
            formdata.append('file', $file);
            formdata.append('nome', $nome)
            $http.post("/app/data/app.php?d=enviarArq", formdata, {
                transformRequest: angular.identify,
                headers: {'Content-Type' : undefined}
            }).then (function (resp) {
                console.log(resp.data);
            })
        },
        getAllUser: function() {
            return $http.get("/data/user.json").then(function(resp) {
                console.log(resp.data);
                return resp.data;
            });
        },
        enviarFiles : function($scope) {
            var formData = new FormData();
            formData.append("arquivo", $scope.files[0]);
            $scope.progressVisible = true;
            $http.post("/app/data/app.php?d=upload", formData, {
                transformRequest: angular.identify,
                headers : {'Content-Type' : undefined},
                params : {formData},
                //responseType: 'arraybuffer',
                uploadEventHandlers : {
                    progress : function (e) {
                        //console.log("evento progress");
                        if (e.lengthComputable) {
                            $scope.progress = Math.round(e.loaded * 100 / e.total);
                            if ($scope.progress == 100) {
                                //$scope.progressVisible = false;
                            }
                        } else {
                            $scope.progress = "Não foi possivel carregar arquivo";
                        }
                    },
                    load : function (e) {
                        //console.log('completo');
                        toaster.pop('info', "", "Arquivo Carregado", 10000, 'trustedHtml');
                    },
                    error : function (e) {
                        console.log("evento error");
                        toaster.pop('error', "", "Erro ao carregar arquivo", 1000, 'trustedHtml');
                    },
                    abort : function (e) {
                        console.log('evento abort');
                        $scope.progressVisible = false;
                        toaster.pop('info', "", "O envio foi cancelado", 10000, 'trustedHtml');
                    }
                }
            }).then (function (resp) {
                console.log(resp.data);
            });
        },
        postLaudoTecnico: function(obj) {
            console.log(obj); // funcionando OK!
            // console.log(text);
            $http.post("/app/data/app.php?d=enviar-laudo-tecnico", obj).then (function (resp) {
                //responder para quando gravar o laudo na ordem de serviço no db e ambas alterar para andamento
                console.log(resp.data);
                var retorno = resp.data;
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                    // $state.reload(); Reload congela a tela com o modal
                }
            });
        },
        changeStatusAndamento: function(obj) {
            // console.log(id);
            $http.post("/app/data/app.php?d=mudar-status-os", obj).then( function (resp) {
                console.log(resp.data);
            });
        },
        lastLaudoById: function (id) {
            console.log(id);
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=last-laudo", {'id':id}).then (function (resp) {
                //console.log(resp.data);
                resolve.resolve(resp.data);
                // console.log(scope.laudos);
            });
            return resolve.promise;
        },
        mudarLaudoDestino: function (obj) {
            $http.post("/app/data/app.php?d=mudar-laudo-destino", obj).then (function (resp) {
                console.log(resp.data); // ecerrada (error, message)
                var retorno = resp.data;
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            });
        },
        encerraOS: function (obj) {
            $http.post("/app/data/app.php?d=encerra-laudo-ordem", obj).then (function (resp) {
                console.log(resp.data); //encerrada (error, message)
                var retorno = resp.data;
                console.log(retorno);

                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            });
        },
        renovarOS: function (obj) {
            $http.post("/app/data/app.php?d=renovar-laudo-ordem", obj).then (function (resp) {
                console.log(resp.data);
                var retorno = resp.data;
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            });
        },
        parseViews : function (id, n) {
            $http.post("/app/data/app.php?d=insert-views-novas-os", {'id': id, 'n': n}).then (function (resp) { // 31/01/2019 - nome do script para views nova ordem de serviço
                console.log(resp.data);
                var retorno = resp.data;
                console.log(retorno);
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            })
        },
        ativaOS : function (obj) {
            $http.post("/app/data/app.php?d=ativar-laudo-ordem", obj)
            .then(function (resp) {
                var retorno = resp.data;
                console.log(retorno);
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            })
        },
        esperaOs: function (obj) {
            $http.post("/app/data/app.php?d=por-os-em-espera", obj)
            .then(function (resp) {
                var retorno = resp.data;
                console.log(retorno);
                if (!retorno['error']) {
                    console.log("OK"); // mudar para redirecionamento
                }
            })
        },
        clearNotification: function (id) {
            $http.post('/app/data/app.php?d=clear-notification', {'id': id})
        }
    }
})
.factory('loginService', function($http, $state, $location, sessionService, loginSessionService, toaster) {
    return {
        login: function(user, $scope, $rootScope) {
            console.log(user);
            $http({
                    method: 'POST',
                    url: '/app/acesso/login.php',
                    data: user
                })
                .then(function(res) {
                    var uid = res.data.user; // user angular
                    console.log(res.data);
                    console.log("resp user angular--> " + uid);
                    console.log("user --> " + user['username']);
                    if (uid) {
                        // modificar aqui para um login com sessão em php
                        //sessionService.set('user', uid);
                        loginSessionService.setSession(user['username'], uid, $scope, $rootScope);
                        // hander de home mudar quando
                        //$location.path('/home');
                        //$state.go('dashboard.os');
                    } else {
                        //$scope.successLogin = false;
                        //$scope.errorLogin = true;
                        //$scope.errorMsg = res.data.message;
                        toaster.pop('error', "", res.data.message, 10000, 'trustedHtml');
                    }
                })
        },
        logout: function() {
            sessionService.destroy('user');
            // hander de login
            //$location.path('/login');
            $http.get('/app/acesso/logout.php');
            $state.go('login');
        },
        islogged: function() {
            var checkSession = $http.post('/app/acesso/session.php');
            return checkSession;
        }
    }
})
.service("loginSessionService", function($http, $state, sessionService, toaster) {
    return {
        setSession: function($user, $uid, $scope, $rootScope) {
            $http.post("/app/data/session_user.php", { "user": $user, "uid": $uid }).then(function(resp) {
                console.log($user);
                var data = resp.data;
                var uid = data.uid;
                console.log(data);
                console.log(uid);
                console.log("mensagem de erro : " + resp.data.message);
                //console.log(uid);
                if (uid) {
                    sessionService.set('user', uid);
                    $state.go('dashboard.os');
                    toaster.pop('success', "", data.message, 10000, 'trustedHtml');
                } else {
                    //$scope.successLogin = false;
                    //$scope.errorLogin = true;
                    //$scope.errorMsg = resp.data.message;
                    toaster.pop('error', "", data.message, 10000, 'trustedHtml');
                }
            });
        },
        getUser: function() {
            return $http.post("/app/data/login_user.php").then (function (resp) {
                //console.log(resp.data);
                return resp.data;
            });
        }
    }
})
.service('loginGroup', function($q, $http) {
    this.role = null;
    var resolve = null;
    var that = this;
    this.group = function () {
        if (resolve == null) {
            resolve = $q.defer();
            $http.post("/app/data/session_group.php").then (function (resp) {
                console.log(resp.data);
                that.role = resp.data;
                resolve.resolve(that.role);
            });
        }
        return resolve.promise;
    }
})
.service('OrdemService', function($http, $q) {
    this.listTec = null;
    this.tecid = null;
    this.osenviadanovalist = null;
    this.osenviadaandamentolist = null;
    this.osenviadaesperalist = null;
    this.osenviadaencerradalist = null;
    this.osenviadanovaid = null;
    this.osenviadaandamentoid = null;
    this.osenviadaesperaid = null;
    this.osenviadaencerradaid = null;
    this.osrecebidanovalist = null;
    this.osrecebidandamentolist = null;
    this.osrecebidaesperalist = null;
    this.osrecebidaencerradalist = null;
    this.osrecebidanovaid = null;
    this.osrecebidaandamentoid = null;
    this.osrecebidaesperaid = null;
    this.osrecebidaesncerradaid = null;
    this.oseditadalaudonovalist = null;
    this.oseditadalaudonovaid = null;
    this.oseditadalaudoandamentolist = null;
    this.oseditadalaudoandamentoid = null;
    this.oseditadalaudoesperalist = null;
    this.oseditadalaudoesperaid = null;
    this.oseditadalaudoencerradalist = null;
    this.oseditadalaudoencerradaid = null;
    this.ossolicnovalist = null;
    this.ossolicnovaid = null;
    this.ossolicandamentolist = null;
    this.ossolicandamentoid = null;
    this.ossolicesperalist = null;
    this.ossolicesperaid = null;
    this.ossolicencerradalist = null;
    this.ossolicencerradaid = null;

    var resolveteclist = null,
    resolvetecid = null,
    resolveosenviadanovalist = null,
    resolveosenviadaandamentolist = null,
    resolveosenviadaesperalist = null,
    resolveosenviadaencerradalist = null,
    resolveosenviadanovaid = null,
    resolveosenviadaandamentoid = null,
    resolveosenviadaesperaid = null,
    resolveosenviadaencerradaid = null,
    resolveteclist = null,
    resolveosrecebidanovalist = null,
    resolveosrecebidaandamentolist = null,
    resolveosrecebidaesperalist = null,
    resolveosrecebidaencerradalist = null,
    resolveosrecebidanovaid = null,
    resolveosrecebidaandamentoid = null,
    resolveosrecebidaesperaid = null,
    resolveosrecebidaencerradaid = null,
    resolveoseditadalaudonovalist = null,
    resolveoseditadalaudonovaid = null,
    resolveoseditadalaudoandamentolist = null,
    resolveoseditadalaudoandamentoid = null,
    resolveoseditadalaudoesperalist = null,
    resolveoseditadalaudoesperaid = null,
    resolveoseditadalaudoencerradalist = null,
    resolveoseditadalaudoencerradaid = null,
    resolveossolicnovalist = null,
    resolveossolicnovaid = null,
    resolveossolicandamentolist = null,
    resolveossolicandamentoid = null,
    resolveossolicesperalist = null,
    resolveossolicesperaid = null,
    resolveossolicencerradalist = null,
    resolveossolicencerradaid = null,
    that = this;

    this.getTecList = function() {
        resolveteclist = $q.defer();
        $http.get("/app/data/app.php?d=retornateclista")
        .then (function (resp) {
            console.log(resp.data);
            that.listTec = resp.data;
            resolveteclist.resolve(that.listTec);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveteclist.promise;
    }

    this.getTecEditar = function(user) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveteclist != null) {
            resolvetecid = $q.defer();
            that.tecid = this.listTec.find(function (users) {return users.user === user;});
            resolvetecid.resolve(that.tecid);
            return resolvetecid.promise;
        } else {
            return "";
        }

    }
    // envidas
    this.getOSEnviadaNova = function() {
        resolveosenviadanovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadanovalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osenviadanovalist = resp.data;
            resolveosenviadanovalist.resolve(that.osenviadanovalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadanovalist.promise;
    }

    this.getOSInfoEnviadaNova = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosenviadanovalist != null) {
            resolveosenviadanovaid = $q.defer();
            that.osenviadanovaid = that.osenviadanovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadanovaid.resolve(that.osenviadanovaid);
            return resolveosenviadanovaid.promise;
        } else {
            return "";
        }
    }

    this.getOSEnviadaAndamento = function() {
        resolveosenviadaandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaandamentolista")
        .then (function (resp) {
            console.log(resp.data);
            that.osenviadaandamentolist = resp.data;
            resolveosenviadaandamentolist.resolve(that.osenviadaandamentolist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaandamentolist.promise;
    }

    this.getOSInfoEnviadaAndamento = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosenviadaandamentolist != null) {
            resolveosenviadaandamentoid = $q.defer();
            that.osenviadaandamentoid = that.osenviadaandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaandamentoid.resolve(that.osenviadaandamentoid);
            return resolveosenviadaandamentoid.promise;
        } else {
            return ""
        }
    }

    this.getOSEnviadaEspera = function() {
        resolveosenviadaesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaesperalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osenviadaesperalist = resp.data;
            resolveosenviadaesperalist.resolve(that.osenviadaesperalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaesperalist.promise;
    }

    this.getOSInfoEnviadaEsperada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosenviadaesperalist != null) {
            resolveosenviadaesperaid = $q.defer();
            that.osenviadaesperaid = that.osenviadaesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaesperaid.resolve(that.osenviadaesperaid );
            return resolveosenviadaesperaid.promise;
        }
    }

    this.getOSEnviadaEncerrada = function() {
        resolveosenviadaencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaencerradalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osenviadaencerradalist = resp.data;
            resolveosenviadaencerradalist.resolve(that.osenviadaencerradalist);
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaencerradalist.promise;
    }

    this.getOSInfoEnviadaEncerrada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosenviadaencerradalist != null) {
            resolveosenviadaencerradaid = $q.defer();
            that.osenviadaencerradaid = that.osenviadaencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaencerradaid.resolve(that.osenviadaencerradaid);
            return resolveosenviadaencerradaid.promise;
        }
    }
    // recebidas
    this.getOSRecebidaNova = function() {
        resolveosrecebidanovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidanovalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osrecebidanovalist = resp.data;
            resolveosrecebidanovalist.resolve(that.osrecebidanovalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidanovalist.promise;
    }

    this.getOSInfoRecebidaNova = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosrecebidanovalist != null) {
            resolveosrecebidanovaid = $q.defer();
            that.osrecebidanovaid = that.osrecebidanovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidanovaid.resolve(that.osrecebidanovaid);
            return resolveosrecebidanovaid.promise;
        } else {
            return "";
        }
    }

    this.getOSRecebidaAndamento = function() {
        resolveosrecebidaandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaandamentolista")
        .then (function (resp) {
            console.log(resp.data);
            that.osrecebidaandamentolist = resp.data;
            resolveosrecebidaandamentolist.resolve(that.osrecebidaandamentolist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaandamentolist.promise;
    }

    this.getOSInfoRecebidaAndamento = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosrecebidaandamentolist != null) {
            resolveosrecebidaandamentoid = $q.defer();
            console.log(that.osrecebidaandamentolist);

            that.osrecebidaandamentoid = that.osrecebidaandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaandamentoid.resolve(that.osrecebidaandamentoid);
            return resolveosrecebidaandamentoid.promise;
        } else if (resolveoseditadalaudoandamentolist != null) {
            resolveoseditadalaudoandamentoid = $q.defer();
            that.oseditadalaudoandamentoid = that.oseditadalaudoandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoandamentoid.resolve(that.oseditadalaudoandamentoid);
            return resolveoseditadalaudoandamentoid.promise;
        }
    }

    this.getOSRecebidaEspera = function() {
        resolveosrecebidaesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaesperalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osrecebidaesperalist = resp.data;
            resolveosrecebidaesperalist.resolve(that.osrecebidaesperalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaesperalist.promise;
    }

    this.getOSInfoRecebidaEsperada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        console.log(id);

        if (resolveosrecebidaesperalist != null) {
            resolveosrecebidaesperaid = $q.defer();
            that.osrecebidaesperaid = that.osrecebidaesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaesperaid.resolve(that.osrecebidaesperaid );
            return resolveosrecebidaesperaid.promise;
        }
    }

    this.getOSRecebidaEncerrada = function() {
        resolveosrecebidaencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaencerradalista")
        .then (function (resp) {
            console.log(resp.data);
            that.osrecebidaencerradalist = resp.data;
            resolveosrecebidaencerradalist.resolve(that.osrecebidaencerradalist);
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaencerradalist.promise;
    }

    this.getOSInfoRecebidaEncerrada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveosrecebidaencerradalist != null) {
            resolveosrecebidaencerradaid = $q.defer();
            that.osrecebidaencerradaid = that.osrecebidaencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaencerradaid.resolve(that.osrecebidaencerradaid);
            return resolveosrecebidaencerradaid.promise;
        }
    }

    // solicitante
    this.getOSSolicNova = function() {
        resolveossolicnovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicnovalista")
        .then (function (resp) {
            console.log(resp.data);
            that.ossolicnovalist = resp.data;
            resolveossolicnovalist.resolve(that.ossolicnovalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicnovalist.promise;
    }

    this.getOSInfoSolicNova = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveossolicnovalist != null) {
            resolveossolicnovaid = $q.defer();
            that.ossolicnovaid = that.ossolicnovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicnovaid.resolve(that.ossolicnovaid);
            return resolveossolicnovaid.promise;
        } else {
            return "";
        }
    }

    this.getOSSolicAndamento = function() {
        resolveossolicandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicandamentolista")
        .then (function (resp) {
            console.log(resp.data);
            that.ossolicandamentolist = resp.data;
            resolveossolicandamentolist.resolve(that.ossolicandamentolist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicandamentolist.promise;
    }

    this.getOSInfoSolicAndamento = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveossolicandamentolist != null) {
            resolveossolicandamentoid = $q.defer();
            that.ossolicandamentoid = this.ossolicandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicandamentoid.resolve(that.ossolicandamentoid);
            return resolveossolicandamentoid.promise;
        } else {
            return ""
        }
    }

    this.getOSSolicEspera = function() {
        resolveossolicesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicesperalista")
        .then (function (resp) {
            console.log(resp.data);
            that.ossolicesperalist = resp.data;
            resolveossolicesperalist.resolve(that.ossolicesperalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicesperalist.promise;
    }

    this.getOSInfoSolicEspera = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveossolicesperalist != null) {
            resolveossolicesperaid = $q.defer();
            that.ossolicesperaid = that.ossolicesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicesperaid.resolve(that.ossolicesperaid );
            return resolveossolicesperaid.promise;
        }
    }

    this.getOSSolicEncerrada = function() {
        resolveossolicencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicencerradalista")
        .then (function (resp) {
            console.log(resp.data);
            that.ossolicencerradalist = resp.data;
            resolveossolicencerradalist.resolve(that.ossolicencerradalist);
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicencerradalist.promise;
    }

    this.getOSInfoSolicEncerrada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveossolicencerradalist != null) {
            resolveossolicencerradaid = $q.defer();
            that.ossolicencerradaid = this.ossolicencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicencerradaid.resolve(that.ossolicencerradaid);
            return resolveossolicencerradaid.promise;
        }
    }

     // Admin - laudo alterado
     this.getOSEditadaLaudoNova = function() {
        resolveoseditadalaudonovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudonovalista")
        .then (function (resp) {
            console.log(resp.data);
            that.oseditadalaudonovalist = resp.data;
            resolveoseditadalaudonovalist.resolve(that.oseditadalaudonovalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudonovalist.promise;
    }

    this.getOSInfoEditadaLaudoNova = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveoseditadalaudonovalist != null) {
            resolveoseditadalaudonovaid = $q.defer();
            that.oseditadalaudonovaid = that.oseditadalaudonovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudonovaid.resolve(that.oseditadalaudonovaid);
            return resolveoseditadalaudonovaid.promise;
        } else {
            return "";
        }
    }

    this.getOSEditadaLaudoAndamento = function() {
        resolveoseditadalaudoandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoandamentolista")
        .then (function (resp) {
            console.log(resp.data);
            that.oseditadalaudoandamentolist = resp.data;
            resolveoseditadalaudoandamentolist.resolve(that.oseditadalaudoandamentolist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoandamentolist.promise;
    }

    this.getOSInfoEditadaLaudoAndamento = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveoseditadalaudoandamentolist != null) {
            resolveoseditadalaudoandamentoid = $q.defer();
            that.oseditadalaudoandamentoid = that.oseditadalaudoandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoandamentoid.resolve(that.oseditadalaudoandamentoid);
            return resolveoseditadalaudoandamentoid.promise;
        } else {
            return "[]";
        }
    }

    this.getOSEditadaLaudoEspera = function() {
        resolveoseditadalaudoesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoesperalista")
        .then (function (resp) {
            console.log(resp.data);
            that.oseditadalaudoesperalist = resp.data;
            resolveoseditadalaudoesperalist.resolve(that.oseditadalaudoesperalist);
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoesperalist.promise;
    }

    this.getOSInfoEditadaLaudoEspera = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveoseditadalaudoesperalist != null) {
            resolveoseditadalaudoesperaid = $q.defer();
            that.oseditadalaudoesperaid = this.oseditadalaudoesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoesperaid.resolve(that.oseditadalaudoesperaid );
            return resolveoseditadalaudoesperaid.promise;
        }
    }

    this.getOSEditadaLaudoEncerrada = function() {
        resolveoseditadalaudoencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoencerradalista")
        .then (function (resp) {
            console.log(resp.data);
            that.oseditadalaudoencerradalist = resp.data;
            resolveoseditadalaudoencerradalist.resolve(that.oseditadalaudoencerradalist);
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoencerradalist.promise;
    }

    this.getOSInfoEditadaLaudoEncerrada = function(id) {
        //resolvetecid = $q.defer();
        //$http.post("/app/data/app.php?d=retornatecid", {'id' : id}).then (function (resp) {})
        if (resolveoseditadalaudoencerradalist != null) {
            resolveoseditadalaudoencerradaid = $q.defer();
            that.oseditadalaudoencerradaid = this.oseditadalaudoencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoencerradaid.resolve(that.oseditadalaudoencerradaid);
            return resolveoseditadalaudoencerradaid.promise;
        }
    }


    // var service = {
    //     getOrdensbyCoord: function() { // retorna todas as ordens de serviço (mudar para somente a coordenação)

    //         return $http.get("/app/data/verOrdServ.php").then(function(resp) {
    //                 console.log(resp.data);
    //                 //$http.get("/app/data/order-services.json");
    //                 return resp.data;
    //             },
    //             function(error) {
    //                 console.log(error);
    //                 return $http.get("/app/data/order-services.json").then(function (resp2) {
    //                     return resp2.data;
    //                 },
    //                 function(error2) {
    //                     console.log(error2);
    //                 });
    //             });
    //     },
    //     getOrdem: function(id) { // pega o id da ordem de serviço
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return service.getOrdensbyCoord().then(function(ordem) {
    //             console.log(ordem);
    //             return ordem.find(mathesParam);
    //         });
    //     },
    //     getOSNew : function () { // retorna as novas ordens de serviços na coordenação
    //         return $http.get("/app/data/ver-os-coord-novas.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getNew : function(id) { // pega os ids da novas ordens de serviços
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return $http.post("/app/data/ver-os-coord-novas-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getOSRun : function() { // retorna as ordens de seviços em andamento na coordenção
    //         return $http.get("/app/data/ver-os-coord-andamento.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getRun : function(id) { // pega os ids das ordens de serviços em andamento
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return $http.post("/app/data/ver-os-coord-andamento-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });        },
    //     getOSEnd: function() { // retorna as ordens de serviços encerradas na coordenação
    //         return $http.get("/app/data/ver-os-coord-encerrada.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getEnd: function(id) { // pega os ids das ordens de serviços encerrada
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return $http.post("/app/data/ver-os-coord-encerrada-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getOSTecnicoNew: function () { // retorna as novas ordens de serviços na coordenação
    //         return $http.get("/app/data/ver-os-coord-tecnico-novas.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getTecnicoNew: function(id) { // pega os ids da novas ordens de serviços
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return $http.post("/app/data/ver-os-coord-tecnico-novas-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getOSTecnicoRun : function() { // retorna as ordens de seviços em andamento na coordenção
    //         return $http.get("/app/data/ver-os-coord-tecnico-andamento.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getTecnicoRun : function(id) { // pega os ids das ordens de serviços em andamento
    //         console.log(id);
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         /*return service.getOSTecnicoRun().then(function(ordem) {
    //             console.log(ordem);
    //             return ordem.find(mathesParam);
    //         }); */
    //         return $http.post("/app/data/ver-os-coord-tecnico-andamento-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getOSTecnicoEnd: function() { // retorna as ordens de serviços encerradas na coordenação
    //         return $http.get("/app/data/ver-os-coord-tecnico-encerrada.php").then(function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     },
    //     getTecnicoEnd: function(id) { // pega os ids das ordens de serviços encerrada
    //         function mathesParam(ordem) {
    //             return ordem.id_os === id;
    //         }

    //         return $http.post("/app/data/ver-os-coord-tecnico-encerrada-id.php", {'id':id}).then (function (resp) {
    //             console.log(resp.data);
    //             return resp.data;
    //         });
    //     }
    //     //getInfoOS: function ()
    //     //getOrdensbyCoord: function ($scope)	{
    //     //	$http.get("/app/data/verOrdServ.php").then (function (resp) {
    //     //		console.log(resp.data);
    //     //		$scope.ordens = resp.data;
    //     //	});
    //     //}
    // }

    // return service;
    /*

return {
	getOrdensbyCoord: function ($scope)	{
		$http.post("/app/data/verOrdServ.php").then (function (resp) {
			console.log(resp.data);
			$scope.ordens = resp.data;
		},
		function(error){
             console.log(error); //
        }
		);
	}
}
*/
})
.service('Download', function ($http) {
    return {
        getFile : function (path) {
            console.log(path);
            $http.post("/app/data/download.php", {'path' : path}).then (function (resp){
                console.log(resp);
            });
        }
    }
})
.factory('sessionService', function($http) {
    return {
        set: function(key, value) {
            return sessionStorage.setItem(key, value);
        },
        get: function(key) {
            return sessionStorage.getItem(key);
        },
        destroy: function(key) {
            return sessionStorage.removeItem(key);
        }
    }
});
