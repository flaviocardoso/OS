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
                url: '/',
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
            {
                name: 'dashboard.os',
                url: '/',
                templateProvider: roleContextHelperProvider.templateProvider({
                    "admin": '/app/views/app.php?v=painelosadadmin',
                    "secr": '/app/views/app.php?v=painelossecr',
                    "resp": '/app/views/app.php?v=painelosresp',
                    "tec": '/app/views/app.php?v=painelostec',
                    "sol": '/app/views/app.php?v=painelos',
                    "":  '/app/views/app.php?v=painelos'
                }),
                data: { title: 'OS', nome: 'OS' },
                controller: 'osCtrl'
                // controllerProvider: roleContextHelperProvider.controllerProvider({
                //     admin: 'osadminCtrl',
                //     secr: 'ossecrCtrl',
                //     resp: 'osrespCtrl',
                //     tec: 'ostecCtrl',
                //     sol: 'ossolCtrl'
                // })
            },  
            {   // Teste De Funções
                name: 'dashboard.teste',
                url: '/teste', /* teste handler */
                data: { title: 'Teste', nome: 'Teste' },
                component: 'teste'
            }, // Funções para Admin
            {   // Criação de Novas Ordens de Serviço
                name: 'dashboard.criaros', /* criar handler */
                url: '/criaros',
                data: { title: 'CRIAR OS', nome: "Criar OS" },
                component: 'criaros'
            },
            {   // Cr. OS. para solicitante
                name: 'dashboard.criaros.solic',
                url: '-solic', /* criar-solic handler */
                component: 'criarossolic',
                data: { nome: "Solicitante" }
            },
            {   // Cr. OS. para destinação
                name: 'dashboard.criaros.dest',
                url: '-dest', /* criar-desc handler */
                component: 'criarosdest',
                data: { nome: "Destinação" }
            },
            {   // Cr. OS. para descrição
                name: 'dashboard.criaros.descr',
                url: '-descr', /* criar-descr */
                component: 'criarosdescr',
                data: { nome: "Descrição" }
            },
            {   // Criação de Um Novo Técnico
                name: 'dashboard.criartec',
                url: '/criartec',
                component: 'criartec',
                data: { title: 'Criar User OS', nome: 'Criar User OS' },
            },
            {   // Criação de Um Novo Técnico
                name: 'dashboard.criargrupo',
                url: '/criargrupo',
                component: 'criargrupo',
                data: { title: 'Criar User sem grupo', nome: 'Criar User sem grupo' },
            },
            {   // Criação de Um Novo Técnico
                name: 'dashboard.criarinfo',
                url: '/criarinfo',
                component: 'criarinfo',
                data: { title: 'Criar User Geral', nome: 'Criar User Geral' },
            },
            {   // Editar Um Técnico Existente - lista de Técnicos
                name: 'dashboard.editeteclista',
                url: '/editeteclista',
                component: 'editeteclista',
                data: {title: 'Lista de Técnicos', nome: 'Lista de Técnicos'},
                resolve: { verTecList: function(OrdemService) { return OrdemService.getTecList(); } }
            },
            {
                name: 'dashboard.editetec',
                url: '/editetec/{tecID}',
                component: 'editetec',
                data: { title: 'Edite Técnico', nome: 'Edite Técnico' },
                resolve: { tecid: function(OrdemService, $transition$) { return OrdemService.getTecEditar($transition$.params().tecID) } }
            },
            {
                name: 'dashboard.ver',
                url: '/ver-os', /* direção para lista das ordens de servicos */
                data: { title: 'Ordens de Serviço', nome : "S. Ordem de Serviço" },
                component: 'ver'
            },// Ordens de Serviço Enviadas lista enviar - admin (todas)
            {
                name: 'dashboard.ver.enviadavernovaadmin',
                url: '/',
                component: 'enviadavernovaadmin',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaNovaAdmin(); } }
            },
            {
                name: 'dashboard.ver.enviadaverandamentoadmin',
                url: '/',
                component: 'enviadaverandamentoadmin',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaAndamentoAdmin(); } }
            },
            {
                name: 'dashboard.ver.enviadaveresperaadmin',
                url: '/',
                component: 'enviadaveresperaadmin',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEsperaAdmin(); } }
            },
            {
                name: 'dashboard.ver.enviadaverencerradaadmin',
                url: '/',
                component: 'enviadaverencerradaadmin',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEncerradaAdmin(); } }
            }, // Informação Enviadas das Ordens de Serviço - admin (todas)
            {
                name: 'dashboard.infoenviadavernovaadmin',
                url: '/info-enviada-nova/{osID}',
                component: 'infoenviadavernovaadmin',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaNovaAdmin($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaverandamentoadmin',
                url: '/info-enviada-andamento/{osID}',
                component: 'infoenviadaverandamentoadmin',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaAndamentoAdmin($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaveresperaadmin',
                url: '/info-enviada-espera/{osID}',
                component: 'infoenviadaveresperaadmin',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEsperadaAdmin($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaverencerradaadmin',
                url: '/info-enviada-encerrada/{osID}',
                component: 'infoenviadaverencerradaadmin',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEncerradaAdmin($transition$.params().osID) } }
            },// Ordens de Serviço Enviadas lista enviar - admin, resp, secr (coord)
            {
                name: 'dashboard.ver.enviadavernova',
                url: '/',
                component: 'enviadavernova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaNova(); } }
            },
            {
                name: 'dashboard.ver.enviadaverandamento',
                url: '/',
                component: 'enviadaverandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaAndamento(); } }
            },
            {
                name: 'dashboard.ver.enviadaverespera',
                url: '/',
                component: 'enviadaverespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEspera(); } }
            },
            {
                name: 'dashboard.ver.enviadaverencerrada',
                url: '/',
                component: 'enviadaverencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEnviadaEncerrada(); } }
            }, // Informação Enviadas das Ordens de Serviço - admin, resp, secr (coord)
            {
                name: 'dashboard.infoenviadavernova',
                url: '/info-enviada-nova/{osID}',
                component: 'infoenviadavernova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaverandamento',
                url: '/info-enviada-andamento/{osID}',
                component: 'infoenviadaverandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaverespera',
                url: '/info-enviada-espera/{osID}',
                component: 'infoenviadaverespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEsperada($transition$.params().osID) } }
            },
            {
                name: 'dashboard.infoenviadaverencerrada',
                url: '/info-enviada-encerrada/{osID}',
                component: 'infoenviadaverencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEnviadaEncerrada($transition$.params().osID) } }
            },  // Ordens de Serviço Recebidas lista enviar
            {
                name: 'dashboard.ver.recebidavernova',
                url: '/',
                component: 'recebidavernova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaNova(); } }
            },
            {
                name: 'dashboard.ver.recebidaverandamento',
                url: '/',
                component: 'recebidaverandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaAndamento(); } }
            },
            {
                name: 'dashboard.ver.recebidaverespera',
                url: '/',
                component: 'recebidaverespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaEspera(); } }
            },
            {
                name: 'dashboard.ver.recebidaverencerrada',
                url: '/',
                component: 'recebidaverencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaEncerrada(); } }
            }, // Informação Recebidas das Ordens de Serviço - admin, secr (coord)
            {
                name: 'dashboard.inforecebidavernova',
                url: '/info-recebida-nova/{osID}',
                component: 'inforecebidavernova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.inforecebidavernovaedite',
                url: '/info-recebida-nova/{osID}/edite',
                component: 'editenova',
                data: {title: 'Edite Ordem de Serviço', nome: 'Edite Ordem de Serviço'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.inforecebidaverandamento',
                url: '/info-recebida-andamento/{osID}',
                component: 'inforecebidaverandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.inforecebidaverespera',
                url: '/info-recebida-espera/{osID}',
                component: 'inforecebidaverespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaEsperada($transition$.params().osID) } }
            },
            {
                name: 'dashboard.inforecebidaverencerrada',
                url: '/info-recebida-encerrada/{osID}',
                component: 'inforecebidaverencerrada',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaEncerrada($transition$.params().osID) } }
            },  // Admin --> laudo editado por user
            {
                name: 'dashboard.ver.editadalaudovernova',
                url: '/',
                component: 'editadalaudovernova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoNova(); } }
            },
            {
                name: 'dashboard.infoeditadalaudonova',
                url: '/info-editada-nova/{osID}',
                component: 'infoeditadalaudonova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverandamento',
                url: '/',
                component: 'editadalaudoverandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoAndamento(); } }
            },
            {
                name: 'dashboard.infoeditadalaudoandamento',
                url: '/info-editada-andamento/{osID}',
                component: 'infoeditadalaudoandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverespera',
                url: '/',
                component: 'editadalaudoverespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoEspera(); } }
            },
            {
                name: 'dashboard.infoeditadalaudoespera',
                url: '/info-editada-espera/{osID}',
                component: 'infoeditadalaudoespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverencerrada',
                url: '/',
                component: 'editadalaudoverencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoEncerrada(); } }
            },
            {
                name: 'dashboard.infoeditadalaudoencerrada',
                url: '/info-editada-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoEncerrada($transition$.params().osID) } }
            }, // Solicitante --> Acompanhar Ordem de Serviço por user
            {
                name: 'dashboard.ver.solicvernova',
                url: '/',
                component: 'solicvernova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicNova(); } }
            },
            {
                name: 'dashboard.infosolicnova',
                url: '/info-os-solic-nova/{osID}',
                component: 'infosolicnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.solicverandamento',
                url: '/',
                component: 'solicverandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicAndamento(); } }
            },
            {
                name: 'dashboard.infosolicandamento',
                url: '/info-os-solic-andameto/{osID}',
                component: 'infosolicandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.solicverespera',
                url: '/',
                component: 'solicverespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicEspera(); } }
            },
            {
                name: 'dashboard.infosolicespera',
                url: '/info-os-solic-espera/{osID}',
                component: 'infosolicespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.solicverencerrada',
                url: '/',
                component: 'solicverencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSSolicEncerrada(); } }
            },
            {
                name: 'dashboard.infosolicencerrada',
                url: '/info-os-solic-encerrada/{osID}',
                component: 'infosolicencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoSolicEncerrada($transition$.params().osID) } }
            },  // Secretaria OS
            {
                name: 'dashboard.ver.recebidaversecrnova',
                url: '/',
                component: 'recebidaversecrnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaSecrNova(); } }
            },
            {
                name: 'dashboard.inforecebidaversecrnova',
                url: '/info-recebida-secr-nova/{osID}',
                component: 'inforecebidaversecrnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaversecrandamento',
                url: '/',
                component: 'recebidaversecrandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaSecrAndamento(); } }
            },
            {
                name: 'dashboard.inforecebidaversecrandamento',
                url: '/info-recebida-secr-andamento/{osID}',
                component: 'inforecebidaversecrandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaversecrespera',
                url: '/',
                component: 'recebidaversecrespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaSecrEspera(); } }
            },
            {
                name: 'dashboard.inforecebidaversecrespera',
                url: '/info-recebida-secr-espera/{osID}',
                component: 'inforecebidaversecrespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaversecrencerrada',
                url: '/',
                component: 'recebidaversecrencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaSecrEncerrada(); } }
            },
            {
                name: 'dashboard.inforecebidaversecrencerrada',
                url: '/info-recebida-secr-encerrada/{osID}',
                component: 'inforecebidaversecrencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaSecrEncerrada($transition$.params().osID) } }
            },// Secretaria --> laudo editado por user
            {
                name: 'dashboard.ver.editadalaudoversecrnova',
                url: '/',
                component: 'editadalaudoversecrnova',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrNova(); } }
            },
            {
                name: 'dashboard.infoeditadalaudosecrnova',
                url: '/info-editada-secr-nova/{osID}',
                component: 'infoeditadalaudosecrnova',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrandamento',
                url: '/',
                component: 'editadalaudoversecrandamento',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrAndamento(); } }
            },
            {
                name: 'dashboard.infoeditadalaudosecrandamento',
                url: '/info-editada-secr-andamento/{osID}',
                component: 'infoeditadalaudosecrandamento',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrespera',
                url: '/',
                component: 'editadalaudoversecrespera',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrEspera(); } }
            },
            {
                name: 'dashboard.infoeditadalaudosecrespera',
                url: '/info-editada-secr-espera/{osID}',
                component: 'infoeditadalaudosecrespera',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrencerrada',
                url: '/',
                component: 'editadalaudoversecrencerrada',
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoSecrEncerrada(); } }
            },
            {
                name: 'dashboard.infoeditadalaudosecrencerrada',
                url: '/info-editada-secr-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoSecrEncerrada($transition$.params().osID) } }
            },  // Responsável OS
            {
                name: 'dashboard.ver.recebidaverrespnova',
                url: '/',
                component: 'recebidaverrespnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaRespNova(); } }
            },
            {
                name: 'dashboard.inforecebidaverrespnova',
                url: '/info-recebida-resp-nova/{osID}',
                component: 'inforecebidaverrespnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaverrespandamento',
                url: '/',
                component: 'recebidaverrespandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaRespAndamento(); } }
            },
            {
                name: 'dashboard.inforecebidaverrespandamento',
                url: '/info-recebida-resp-andamento/{osID}',
                component: 'inforecebidaverrespandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaverrespespera',
                url: '/',
                component: 'recebidaverrespespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaRespEspera(); } }
            },
            {
                name: 'dashboard.inforecebidaverrespespera',
                url: '/info-recebida-resp-espera/{osID}',
                component: 'inforecebidaverrespespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidaverrespencerrada',
                url: '/',
                component: 'recebidaverrespencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaRespEncerrada(); } }
            },
            {
                name: 'dashboard.inforecebidaverrespencerrada',
                url: '/info-recebida-resp-encerrada/{osID}',
                component: 'inforecebidaverrespencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaRespEncerrada($transition$.params().osID) } }
            },// Resposável --> laudo editado por user
            {
                name: 'dashboard.ver.editadalaudoverrespnova',
                url: '/',
                component: 'editadalaudoverrespnova',
                data: {title: "Nova", nome: "Nova"},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespNova(); } }
            },
            {
                name: 'dashboard.infoeditadalaudorespnova',
                url: '/info-editada-resp-nova/{osID}',
                component: 'infoeditadalaudorespnova',
                data: {title: "Info Nova", nome: "Info Nova"},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespandamento',
                url: '/',
                component: 'editadalaudoverrespandamento',
                data: {title: "Andamento", nome: "Andamento"},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespAndamento(); } }
            },
            {
                name: 'dashboard.infoeditadalaudorespandamento',
                url: '/info-editada-resp-andamento/{osID}',
                component: 'infoeditadalaudorespandamento',
                data: {title: "Info Andamento", nome: "Info Andamento"},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespespera',
                url: '/',
                component: 'editadalaudoverrespespera',
                data: {title: "Espera", nome: "Espera"},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespEspera(); } }
            },
            {
                name: 'dashboard.infoeditadalaudorespespera',
                url: '/info-editada-resp-espera/{osID}',
                component: 'infoeditadalaudorespespera',
                data: {title: "Info Espera", nome: "Info Espera"},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespencerrada',
                url: '/',
                component: 'editadalaudoverrespencerrada',
                data: {title: "Encerrada", nome: "Encerrada"},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoRespEncerrada(); } }
            },
            {
                name: 'dashboard.infoeditadalaudorespencerrada',
                url: '/info-editada-resp-encerrada/{osID}',
                component: 'infoeditadalaudorespencerrada',
                data: {title: "Info Encerrada", nome: "Info Encerrada"},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoRespEncerrada($transition$.params().osID) } }
            }, // Técnico OS
            {
                name: 'dashboard.ver.recebidavertecnova',
                url: '/',
                component: 'recebidavertecnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaTecNova(); } }
            },
            {
                name: 'dashboard.inforecebidavertecnova',
                url: '/info-recebida-tec-nova/{osID}',
                component: 'inforecebidavertecnova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecNova($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidavertecandamento',
                url: '/',
                component: 'recebidavertecandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaTecAndamento(); } }
            },
            {
                name: 'dashboard.inforecebidavertecandamento',
                url: '/info-recebida-tec-andamento/{osID}',
                component: 'inforecebidavertecandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidavertecespera',
                url: '/',
                component: 'recebidavertecespera',
                data: {title: 'Espera', nome: 'Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaTecEspera(); } }
            },
            {
                name: 'dashboard.inforecebidavertecespera',
                url: '/info-recebida-tec-espera/{osID}',
                component: 'inforecebidavertecespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.recebidavertecencerrada',
                url: '/',
                component: 'recebidavertecencerrada',
                data: {title: 'Encerrada', nome: 'Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSRecebidaTecEncerrada(); } }
            },
            {
                name: 'dashboard.inforecebidavertecencerrada',
                url: '/info-recebida-tec-encerrada/{osID}',
                component: 'inforecebidavertecencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoRecebidaTecEncerrada($transition$.params().osID) } }
            },
            // Tecnico - laudo alteração
            {
              name: 'dashboard.ver.editadalaudovertecnova',
              url: '/',
              component: 'editadalaudovertecnova',
              data: {title: 'Novas', nome: 'Novas'},
              resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecNova();}}
            },
            {
              name: 'dashboard.infoeditadalaudotecnova',
              url: '/info-editada-tec-nova/{osID}',
              component: 'infoeditadalaudotecnova',
              data: {title: 'Informação Novas', nome: 'Informação Novas'},
              resolve: {osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecNova($transition$.params().osID)}}
            },
            {
                name: 'dashboard.ver.editadalaudovertecandamento',
                url: '/',
                component: 'editadalaudovertecandamento',
                data: {title: 'Andamento', nome: 'Andamento'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecAndamento(); } }
            },
            {
                name: 'dashboard.infoeditadalaudotecandamento',
                url: '/info-editada-tec-andamento/{osID}',
                component: 'infoeditadalaudotecandamento',
                data: {title: 'Informação Andamento', nome: 'Informação Andamento'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecAndamento($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudovertecespera',
                url: '/',
                component: 'editadalaudovertecespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecEspera(); } }
            },
            {
                name: 'dashboard.infoeditadalaudotecespera',
                url: '/info-editada-tec-espera/{osID}',
                component: 'infoeditadalaudotecespera',
                data: {title: 'Informação Espera', nome: 'Informação Espera'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecEspera($transition$.params().osID) } }
            },
            {
                name: 'dashboard.ver.editadalaudovertecencerrada',
                url: '/',
                component: 'editadalaudovertecencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { verOs: function(OrdemService) { return OrdemService.getOSEditadaLaudoTecEncerrada(); } }
            },
            {
                name: 'dashboard.infoeditadalaudotecencerrada',
                url: '/info-editada-tec-encerrada/{osID}',
                component: 'infoeditadalaudotecencerrada',
                data: {title: 'Informação Encerrada', nome: 'Informação Encerrada'},
                resolve: { osid: function(OrdemService, $transition$) { return OrdemService.getOSInfoEditadaLaudoTecEncerrada($transition$.params().osID) } }
            },// ---- Fim            
             // Fim ---
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
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
        //$urlRouterProvider.otherwise('/');
    })

.run(function($rootScope, $state, $stateParams, $transitions, $trace, loginService) {
    console.log("app run");
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $trace.enabled('TRANSITION');

    var connected = loginService.islogged();
    connected.then(function (resp) {
        if (resp.data) {
            $state.go('dashboard.os');
        } else {
            $state.go('login');
        }
    });
    const criteriaObj = {
            to: (state) => !!state.data.title
        }
    $transitions.onSuccess(criteriaObj, function(transition) {
        document.title = transition.to().data.nome;
    });
})
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
//componentes
.component("login", {templateUrl: "/app/views/login.php", controller: "loginCtrl"})
.component("teste", {templateUrl: "/app/views/app.php?v=teste", controller: "testeCtrl"})
.component("criaros", {templateUrl: "/app/views/app.php?v=criaros", controller: "criarosCtrl"})
.component("criarossolic", {templateUrl: "/app/views/app.php?v=criarossolic", controller: "criarossolicCtrl"})
.component("criarosdest", {templateUrl: "/app/views/app.php?v=criarosdest", controller: "criarosdestCtrl"})
.component("criarosdescr", {templateUrl: "/app/views/app.php?v=criarosdescr", controller: "criarosdescrCtrl"})
.component("criartec", {templateUrl: "/app/views/app.php?v=criartec", controller: "criartecCtrl"})
.component("criargrupo", {templateUrl: "/app/views/app.php?v=criargrupo", controller: "criartecCtrl"})
.component("criarinfo", {templateUrl: "/app/views/app.php?v=criarinfo", controller: "criartecCtrl"})
.component("editeteclista", {templateUrl: "/app/views/app.php?v=editeteclista", controller: "editeteclistaCtrl", bindings: { verTecList: '<' }})
.component("editetec", {templateUrl: "/app/views/app.php?v=editetec", controller: "editetecCtrl", bindings: { tecid: '<' }})
.component("ver", {templateUrl: "/app/views/app.php?v=ver", controller: "verCtrl"})
.component("enviadavernovaadmin", {templateUrl: "/app/views/app.php?v=enviadavernovaadmin", controller: "enviadavernovaCtrl", bindings: { verOs: '<' }})
.component("enviadaverandamentoadmin", {templateUrl: "/app/views/app.php?v=enviadaverandamentoadmin", controller: "enviadaverandamentoCtrl", bindings: { verOs: '<' }})
.component("enviadaveresperaadmin", {templateUrl: "/app/views/app.php?v=enviadaveresperaadmin", controller: "enviadaveresperaCtrl", bindings: { verOs: '<' }})
.component("enviadaverencerradaadmin", {templateUrl: "/app/views/app.php?v=enviadaverencerradaadmin", controller: "enviadaverencerradaCtrl", bindings: { verOs: '<' }})
.component("infoenviadavernovaadmin", {templateUrl: "/app/views/app.php?v=infoenviadavernovaadmin", controller: "infoenviadavernovaCtrl", bindings: { osid: '<' }})
.component("infoenviadaverandamentoadmin", {templateUrl: "/app/views/app.php?v=infoenviadaverandamentoadmin", controller: "infoenviadaverandamentoCtrl", bindings: { osid: '<' }})
.component("infoenviadaveresperaadmin", {templateUrl: "/app/views/app.php?v=infoenviadaveresperaadmin", controller: "infoenviadaveresperaCtrl", bindings: { osid: '<' }})
.component("infoenviadaverencerradaadmin", {templateUrl: "/app/views/app.php?v=infoenviadaverencerradaadmin", controller: "infoenviadaverencerradaCtrl", bindings: { osid: '<' }})
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
.component("inforecebidaversecrnova", {templateUrl: "/app/views/app.php?v=inforecebidaversecrnova", controller: "inforecebidaversecrnovaCtrl", bindings: { osid: '<' }})
.component("recebidaversecrandamento", {templateUrl: "/app/views/app.php?v=recebidaversecrandamento", controller: "recebidaversecrandamentoCtrl", bindings: { verOs: '<' }})
.component("inforecebidaversecrandamento", {templateUrl: "/app/views/app.php?v=inforecebidaversecrandamento", controller: "inforecebidaversecrandamentoCtrl", bindings: { osid: '<' }})
.component("recebidaversecrespera", {templateUrl: "/app/views/app.php?v=recebidaversecrespera", controller: "recebidaversecresperaCtrl", bindings: { verOs: '<' }})
.component("inforecebidaversecrespera", {templateUrl: "/app/views/app.php?v=inforecebidaversecrespera", controller: "inforecebidaversecresperaCtrl", bindings: { osid: '<' }})
.component("recebidaversecrencerrada", {templateUrl: "/app/views/app.php?v=recebidaversecrencerrada", controller: "recebidaversecrencerradaCtrl", bindings: { verOs: '<' }})
.component("inforecebidaversecrencerrada", {templateUrl: "/app/views/app.php?v=inforecebidaversecrencerrada", controller: "inforecebidaversecrencerradaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespnova", {templateUrl: "/app/views/app.php?v=recebidaverrespnova", controller: "recebidaverrespnovaCtrl", bindings: { verOs: '<' }})
.component("inforecebidaverrespnova", {templateUrl: "/app/views/app.php?v=inforecebidaverrespnova", controller: "inforecebidaverrespnovaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespandamento", {templateUrl: "/app/views/app.php?v=recebidaverrespandamento", controller: "recebidaverrespandamentoCtrl", bindings: { verOs: '<' }})
.component("inforecebidaverrespandamento", {templateUrl: "/app/views/app.php?v=inforecebidaverrespandamento", controller: "inforecebidaverrespandamentoCtrl", bindings: { osid: '<' }})
.component("recebidaverrespespera", {templateUrl: "/app/views/app.php?v=recebidaverrespespera", controller: "recebidaverrespesperaCtrl", bindings: { verOs: '<' }})
.component("inforecebidaverrespespera", {templateUrl: "/app/views/app.php?v=inforecebidaverrespespera", controller: "inforecebidaverrespesperaCtrl", bindings: { osid: '<' }})
.component("recebidaverrespencerrada", {templateUrl: "/app/views/app.php?v=recebidaverrespencerrada", controller: "recebidaverrespencerradaCtrl", bindings: { verOs: '<' }})
.component("inforecebidaverrespencerrada", {templateUrl: "/app/views/app.php?v=inforecebidaverrespencerrada", controller: "inforecebidaverrespencerradaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespnova", {templateUrl: "/app/views/app.php?v=editadalaudoverrespnova", controller: "editadalaudoverrespnovaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespnova", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespnova", controller: "infoeditadalaudorespnovaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespandamento", {templateUrl: "/app/views/app.php?v=editadalaudoverrespandamento", controller: "editadalaudoverrespandamentoCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespandamento", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespandamento", controller: "infoeditadalaudorespandamentoCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespespera", {templateUrl: "/app/views/app.php?v=editadalaudoverrespespera", controller: "editadalaudoverrespesperaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespespera", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespespera", controller: "infoeditadalaudorespesperaCtrl", bindings: { osid: '<' }})
.component("editadalaudoverrespencerrada", {templateUrl: "/app/views/app.php?v=editadalaudoverrespencerrada", controller: "editadalaudoverrespencerradaCtrl", bindings: { verOs: '<' }})
.component("infoeditadalaudorespencerrada", {templateUrl: "/app/views/app.php?v=infoeditadalaudorespencerrada", controller: "infoeditadalaudorespencerradaCtrl", bindings: { osid: '<' }})
.component("recebidavertecnova", {templateUrl: "/app/views/app.php?v=recebidavertecnova", controller: "recebidavertecnovaCtrl", bindings: { verOs: '<' }})
.component("inforecebidavertecnova", {templateUrl: "/app/views/app.php?v=inforecebidavertecnova", controller: "inforecebidavertecnovaCtrl", bindings: { osid: '<' }})
.component("recebidavertecandamento", {templateUrl: "/app/views/app.php?v=recebidavertecandamento", controller: "recebidavertecandamentoCtrl", bindings: { verOs: '<' }})
.component("inforecebidavertecandamento", {templateUrl: "/app/views/app.php?v=inforecebidavertecandamento", controller: "inforecebidavertecandamentoCtrl", bindings: { osid: '<' }})
.component("recebidavertecespera", {templateUrl: "/app/views/app.php?v=recebidavertecespera", controller: "recebidavertecesperaCtrl", bindings: { verOs: '<' }})
.component("inforecebidavertecespera", {templateUrl: "/app/views/app.php?v=inforecebidavertecespera", controller: "inforecebidavertecesperaCtrl", bindings: { osid: '<' }})
.component("recebidavertecencerrada", {templateUrl: "/app/views/app.php?v=recebidavertecencerrada", controller: "recebidavertecencerradaCtrl", bindings: { verOs: '<' }})
.component("inforecebidavertecencerrada", {templateUrl: "/app/views/app.php?v=inforecebidavertecencerrada", controller: "inforecebidavertecencerradaCtrl", bindings: { osid: '<' }})
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

// controles
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
// serviços
.service('CoordService', function($http, toaster, $q, loginService, $window, $state) {
    return {
        getCoord: function($scope) {
            $http.get("/app/data/app.php?d=dataCoord")
            .then(function(resp) {console.log(resp);
                if (resp.data.session == 'ON') {
                    $scope.coorddados = resp.data.data;
                    // console.log(resp.data.data);
                    
                } else {console.log("coord1");
                    // loginService.logout();
                }                
            });
        },
        getSetorbycoord: function(coord, $scope) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=dataSetor", { "coord": coord })
            .then(function(resp) {console.log(resp);
                if (resp.data.session == 'ON') {
                    $scope.setordados = resp.data.data;
                    resolve.resolve(resp.data.data);
                } else {console.log("setor1");
                    // loginService.logout();
                }                
            });
            return resolve.promise;
        },
        getSubSetorbysetor: function(setor, $scope) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=dataSubSetor", { "setor": setor })
            .then(function(resp) {console.log(resp);
                if (resp.data.session == 'ON') {
                    $scope.subsetordados = resp.data.data;
                    resolve.resolve(resp.data.data);
                } else {console.log('subsetor1');
                    // loginService.logout();
                }                
            });
            return resolve.promise;
        },
        getAreabysubsetor: function(subsetor, $scope) {
            $http.post("/app/data/app.php?d=dataArea", { "subsetor": subsetor })
            .then(function(resp) {console.log(resp);
                if (resp.data.session = 'ON') {
                    $scope.areadados = resp.data.data;
                } else {console.log('area1');
                    // loginService.logout();
                }                
            });
        },
        getServicebyarea: function(subsetor, area, $scope) {
            $http.post("/app/data/app.php?d=dataService", {"subsetor": subsetor, "area": area})
            .then(function(resp) {
                if (resp.data.session = 'ON') {
                    $scope.servicedados = resp.data.data;
                } else {
                    loginService.logout();
                }             
            })
        },
        getCoordSolic: function($scope) {
            $http.get("/app/data/app.php?d=dataCoord")
            .then(function(resp) {
                if (resp.data.session == 'ON') {
                    $scope.coorddadosSolic = resp.data.data;
                } else {
                    loginService.logout();
                }               
            });
        },
        getSetorbycoordSolic: function(coord, $scope) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=dataSetor", { "coord": coord })
            .then(function(resp) {
                if (resp.data.session == 'ON') {
                    $scope.setordadosSolic = resp.data.data;
                    resolve.resolve(resp.data.data);
                } else {
                    loginService.logout();
                }
            });
            return resolve.promise;
        },
        getSubSetorResp: function ($scope) {
            $http.get("/app/data/app.php?d=subsetor-resp")
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    $scope.setordados = resp.data.data;
                } else {
                    loginService.logout();
                }
            });
        },
        getAreaTec: function ($scope) {
            $http.get("/app/data/app.php?d=area-tec")
            .then(function (resp) {
                if (resp.data.session = 'ON') {
                    $scope.areadados = resp.data.data;
                } else {
                    loginService.logout();
                }
            })
        },
        postCriarOS: function(service) {
            $http.post("/app/data/app.php?d=criarOS", service)
            .then(function (resp) {
                // console.log(resp);
                if (resp.data.session == 'ON') {
                    // console.log(resp.data.data);
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                } else {
                    // loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        criarUser: function(data) {
            $http.post("/app/data/app.php?d=criarUserOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');

                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        criarGrupo: function(data) {
            $http.post("/app/data/app.php?d=criarGrupoOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        criarInfo: function(data) {
            $http.post("/app/data/app.php?d=criarInfoOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        ativarNivel: function(user) {
            $http.post("/app/data/app.php?d=ativarNivel", user)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        desativarNivel: function(user) {
            $http.post("/app/data/app.php?d=desativarNivel", user)
            .then(function (resp) {
                // console.log(resp);
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    // toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        editeUser: function(data) {
            $http.post("/app/data/app.php?d=editeUserOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        editeUserInfo: function(data) {
            $http.post("/app/data/app.php?d=editeUserInfoOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        editeUserGrupo: function(data) {
            $http.post("/app/data/app.php?d=editeUserGrupoOS", data)
            .then(function (resp) {
                console.log(resp);
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        enviarFile: function($scope) {
            var formData = new FormData();
            formData.append("arquivo", $scope.files[0]);
            $scope.progressVisible = true;
            return $http.post("/app/data/upload.php", formData, {
                transformRequest: angular.identify,
                headers: { 'Content-Type': undefined },
                params : {formData},
                //responseType: 'arraybuffer',
                uploadEventHandlers : {
                    progress : function (e) {
                        //console.log("evento progress");
                        if (e.lengthComputable) {
                            $scope.progress = Math.round(e.loaded * 100 / e.total);
                        } else {
                            $scope.progress = "Não foi possivel carregar arquivo";
                        }
                    },
                    load : function (e) {
                        toaster.pop('info', "", "Arquivo Carregado", 10000, 'trustedHtml');
                    },
                    error : function (e) {
                        toaster.pop('error', "", "Erro ao carregar arquivo", 1000, 'trustedHtml');
                    },
                    abort : function (e) {
                        $scope.progressVisible = false;
                        toaster.pop('info', "", "O envio foi cancelado", 10000, 'trustedHtml');
                    }
                }
            }).then(function(resp) {
                if (resp.data.session == 'ON') {
                    return resp.data.data;
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        editOsNova: function(os) {
            $http.post("/app/data/app.php?d=editarOS", os).then (function (resp) {
                if (resp.data.session == 'ON') {
                   if (resp.data.error) {
                        toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                    } else {
                        toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                    }
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
                
            });
        },               
        postLaudoTecnico: function(obj) {
            $http.post("/app/data/app.php?d=enviar-laudo-tecnico", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        changeStatusAndamento: function(obj) {
            $http.post("/app/data/app.php?d=mudar-status-os", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                     ;
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        lastLaudoById: function (id) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=last-laudo", {'id':id})
            .then (function (resp) {
                if (resp.data.session == 'ON') {
                    resolve.resolve(resp.data.data);
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }                
            });
            return resolve.promise;
        },
        mudarLaudoDestino: function (obj) {
            $http.post("/app/data/app.php?d=mudar-laudo-destino", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }   
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        encerraOS: function (obj) {
            $http.post("/app/data/app.php?d=encerra-laudo-ordem", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        renovarOS: function (obj) {
            $http.post("/app/data/app.php?d=renovar-laudo-ordem", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                     
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        parseViews : function (obj) {
            $http.post("/app/data/app.php?d=insert-views-novas-os", obj)
            .then(function (resp) {                
                if (resp.data.session == 'ON') {
                    // if (resp.data.error) {
                    //      toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                    //  } else {
                    //      toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                    //  }
                 } else {
                    //  loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        ativaOS : function (obj) {
            $http.post("/app/data/app.php?d=ativar-laudo-ordem", obj)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });            
        },
        esperaOs: function (obj) {
            $http.post("/app/data/app.php?d=por-os-em-espera", obj)
            .then(function (resp) {
                console.log(resp);
                
                if (resp.data.session == 'ON') {
                    if (resp.data.error) {
                         toaster.pop('error', "", resp.data.msg, 10000, 'trustedHtml');
                     } else {
                         toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                     }
                     
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });            
        },
        clearNotification: function (id) {
            $http.post('/app/data/app.php?d=clear-notification', {'id': id})
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                 } else {
                     loginService.logout();
                     toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                 }
            });
        },
        gerarPdf: function (order) {
            $http.post('/app/data/app.php?d=downloadphp', {'order': order}, {
                responseType: 'arraybuffer'
            })
            .then(function (resp) {                                                    
                var headers = resp.headers();
                var contentType = headers['content-type'];
                var blob = new Blob([resp.data], {type: contentType});
                var url = window.URL.createObjectURL(blob);                
                var linkElement = document.createElement('a');
                try {                    
                    var url = window.URL.createObjectURL(blob);                    
                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("target", "_blank");
                    linkElement.setAttribute('download', "gerar-automatico.pdf");                    
                    
                    var click = new MouseEvent('click', {
                        "view" : window,
                        "bubbles" : true,
                        "cancelable" : false
                    });

                    linkElement.dispatchEvent(click); 
                }catch (ex) {
                    console.log(ex);
                }               
               
            })
        },
        getNome: function ($scope, user) {
            $http.post('/app/data/entradanomeparaemail.php', {'nome':user})
            .then (function (resp) {
                if (resp.data.session == 'ON') {
                    $scope.sol_email = resp.data.data;
                }                
            });
        },
        getUser: function ($scope, user) {
            $http.post('/app/data/entradauserparanome.php', {'user':user})
            .then (function (resp) {
                if (resp.data.session == 'ON') {
                    $scope.tec.nome = resp.data.data;
                }
            });
        },
        verSolicitante: function(e) {
            var retorno = $http.post('/app/data/app.php?d=versolicitante', {'useremail': e});
            return retorno;            
        },
        criarSolicitante: function (OS) {
            $http.post('/app/data/app.php?d=criarSolicitante', {'data': OS})
            .then (function (resp) {
                console.log(resp);
                
                if (resp.data.session == 'ON') {
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');                    
                } else {
                    //loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            });
        },
        loadSolic: function (user, scope) {
            var resolve = $q.defer();
            $http.post('/app/data/app.php?d=carregarsolicitante', {'user': user})
            .then (function (resp) {                
                if (resp.data.session == 'ON') {  
                    resolve.resolve(resp.data.data);                    
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                } else {
                    //loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            return resolve.promise;
        }
    }
})
.factory('loginService', function($http, $state, $window, $location, sessionService, loginSessionService, toaster) {
    return {
        login: function(user, $scope, $rootScope) {
            $http({
                    method: 'POST',
                    url: '/app/acesso/login.php',
                    data: user
                })
                .then(function(res) {
                    //console.log(res);
                    var uid = res.data.user; // user angular
                    if (uid) {
                        loginSessionService.setSession(user['username'], uid, $scope, $rootScope);
                    } else {
                        $scope.user.username = "";
                        $scope.user.password = "";
                        toaster.pop('error', "", res.data.message, 10000, 'trustedHtml');
                    }
                })
        },
        logout: function() {
            sessionService.destroy('user');
            $http.get('/app/acesso/logout.php');
            $window.location.href = "/";
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
            $http.post("/app/session/app.php?s=user", { "user": $user, "uid": $uid }).then(function(resp) {
                
                var data = resp.data;
                var uid = data.uid;                 
                if (uid) {
                    sessionService.set('user', uid);
                    $state.go('dashboard.os');
                    toaster.pop('success', "", data.message, 10000, 'trustedHtml');
                } else {
                    toaster.pop('error', "", data.message, 10000, 'trustedHtml');
                }
            });
        },
        getUser: function() {
            return $http.post("/app/data/login_user.php").then (function (resp) {
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
                if (resp.data) {
                    resolve.resolve(resp.data);
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
                
            });
        }
        return resolve.promise;
    }
})
.service('OrdemService', function($http, $q, loginService) {
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
    this.osenviadanovaadminlist = null;
    this.osenviadaandamentoadminlist = null;
    this.osenviadaesperaadminlist = null;
    this.osenviadaencerradaadminlist = null;
    this.osenviadanovaadminid = null;
    this.osenviadaandamentoadminid = null;
    this.osenviadaesperaadminid = null;
    this.osenviadaencerradaadminid = null;
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
    this.oseditadalaudotecnovalist = null;
    this.oseditadalaudotecnovaid = null;
    this.oseditadalaudotecandamentolist = null;
    this.oseditadalaudotecandamentoid = null;
    this.oseditadalaudotecesperalist = null;
    this.oseditadalaudotecesperaid = null;
    this.oseditadalaudotecencerradalist = null;
    this.oseditadalaudotecencerradaid = null;
    this.oseditadalaudorespnovalist = null;
    this.oseditadalaudorespnovaid = null;
    this.oseditadalaudorespandamentolist = null;
    this.oseditadalaudorespandamentoid = null;
    this.oseditadalaudorespesperalist = null;
    this.oseditadalaudorespesperaid = null;
    this.oseditadalaudorespencerradalist = null;
    this.oseditadalaudorespencerradaid = null;
    this.ossolicnovalist = null;
    this.ossolicnovaid = null;
    this.ossolicandamentolist = null;
    this.ossolicandamentoid = null;
    this.ossolicesperalist = null;
    this.ossolicesperaid = null;
    this.ossolicencerradalist = null;
    this.ossolicencerradaid = null;
    this.osrecebidasecrnovalist = null;
    this.osrecebidasecrandamentolist = null;
    this.osrecebidasecresperalist = null;
    this.osrecebidasecrencerradalist = null;
    this.osrecebidarespnovalist = null;
    this.osrecebidarespandamentolist = null;
    this.osrecebidarespesperalist = null;
    this.osrecebidarespencerradalist = null;
    this.osrecebidatecnovalist = null;
    this.osrecebidatecandamentolist = null;
    this.osrecebidatecesperalist = null;
    this.osrecebidatecencerradalist = null;
    this.osrecebidasecrnovaid = null;
    this.osrecebidasecrandamentoid = null;
    this.osrecebidasecresperaid = null;
    this.osrecebidasecrencerradaid = null;
    this.osrecebidarespnovaid = null;
    this.osrecebidarespandamentoid = null;
    this.osrecebidarespesperaid = null;
    this.osrecebidarespencerradaid = null;
    this.osrecebidatecnovaid = null;
    this.osrecebidatecandamentoid = null;
    this.osrecebidatecesperaid = null;
    this.osrecebidatecencerradaid = null;

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
    resolveosenviadanovaadminlist = null,
    resolveosenviadaandamentoadminlist = null,
    resolveosenviadaesperaadminlist = null,
    resolveosenviadaencerradaadminlist = null,
    resolveosenviadanovaadminid = null,
    resolveosenviadaandamentoadminid = null,
    resolveosenviadaesperaadminid = null,
    resolveosenviadaencerradaadminid = null,
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
    resolveoseditadalaudorespnovalist = null,
    resolveoseditadalaudorespnovaid = null,
    resolveoseditadalaudorespandamentolist = null,
    resolveoseditadalaudorespandamentoid = null,
    resolveoseditadalaudorespesperalist = null,
    resolveoseditadalaudorespesperaid = null,
    resolveoseditadalaudorespencerradalist = null,
    resolveoseditadalaudorespencerradaid = null,
    resolveoseditadalaudotecnovalist = null,
    resolveoseditadalaudotecnovaid = null,
    resolveoseditadalaudotecandamentolist = null,
    resolveoseditadalaudotecandamentoid = null,
    resolveoseditadalaudotecesperalist = null,
    resolveoseditadalaudotecesperaid = null,
    resolveoseditadalaudotecencerradalist = null,
    resolveoseditadalaudotecencerradaid = null,
    resolveossolicnovalist = null,
    resolveossolicnovaid = null,
    resolveossolicandamentolist = null,
    resolveossolicandamentoid = null,
    resolveossolicesperalist = null,
    resolveossolicesperaid = null,
    resolveossolicencerradalist = null,
    resolveossolicencerradaid = null,
    resolveosrecebidasecrnovalist = null,
    resolveosrecebidasecrandamentolist = null,
    resolveosrecebidasecresperalist = null,
    resolveosrecebidasecrencerradalist = null,
    resolveosrecebidasecrnovaid = null,
    resolveosrecebidasecrandamentoid = null,
    resolveosrecebidasecresperaid = null,
    resolveosrecebidasecrencerradaid = null,
    resolveosrecebidarespnovalist = null,
    resolveosrecebidarespandamentolist = null,
    resolveosrecebidarespesperalist = null,
    resolveosrecebidarespencerradalist = null,
    resolveosrecebidarespnovaid = null,
    resolveosrecebidarespandamentoid = null,
    resolveosrecebidarespesperaid = null,
    resolveosrecebidarespencerradaid = null,
    resolveosrecebidatecnovalist = null,
    resolveosrecebidatecandamentolist = null,
    resolveosrecebidatecesperalist = null,
    resolveosrecebidatecencerradalist = null,
    resolveosrecebidatecnovaid = null,
    resolveosrecebidatecandamentoid = null,
    resolveosrecebidatecesperaid = null,
    resolveosrecebidatecencerradaid = null,
    that = this;

    this.getTecList = function() {
        resolveteclist = $q.defer();
        $http.get("/app/data/app.php?d=retornateclista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.listTec = resp.data;
                resolveteclist.resolve(that.listTec);
            } else {
                console.log('logout');
                
                loginService.logout();
            }
            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveteclist.promise;
    }

    this.getTecEditar = function(user) {
        if (resolveteclist != null) {
            resolvetecid = $q.defer();
            that.tecid = this.listTec.find(function (users) {return users.user === user;});
            resolvetecid.resolve(that.tecid);
            return resolvetecid.promise;
        } else {
            loginService.logout();
        }

    }
    // envidas admin
    this.getOSEnviadaNovaAdmin = function() {
        resolveosenviadanovaadminlist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadanovaadminlista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osenviadanovaadminlist = resp.data;
                resolveosenviadanovaadminlist.resolve(that.osenviadanovaadminlist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadanovaadminlist.promise;
    }

    this.getOSInfoEnviadaNovaAdmin = function(id) {
        if (resolveosenviadanovaadminlist != null) {
            resolveosenviadanovaadminid = $q.defer();
            that.osenviadanovaadminid = that.osenviadanovaadminlist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadanovaadminid.resolve(that.osenviadanovaadminid);
            return resolveosenviadanovaadminid.promise;
        } else {
            console.log("logout");
            
            loginService.logout();
        }
    }

    this.getOSEnviadaAndamentoAdmin = function() {
        resolveosenviadaandamentoadminlist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaandamentoadminlista")
        .then (function (resp) {
            if (resp.data) {
                that.osenviadaandamentoadminlist = resp.data;
                resolveosenviadaandamentoadminlist.resolve(that.osenviadaandamentoadminlist);  
            } else {
                loginService.logout();
            }
            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaandamentoadminlist.promise;
    }

    this.getOSInfoEnviadaAndamentoAdmin = function(id) {
        if (resolveosenviadaandamentoadminlist != null) {
            resolveosenviadaandamentoadminid = $q.defer();
            that.osenviadaandamentoadminid = that.osenviadaandamentoadminlist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaandamentoadminid.resolve(that.osenviadaandamentoadminid);
            return resolveosenviadaandamentoadminid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEnviadaEsperaAdmin = function() {
        resolveosenviadaesperaadminlist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaesperaadminlista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osenviadaesperaadminlist = resp.data;
                resolveosenviadaesperaadminlist.resolve(that.osenviadaesperaadminlist);
            } else {
                loginService.logout();
            }
            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaesperaadminlist.promise;
    }

    this.getOSInfoEnviadaEsperadaAdmin = function(id) {
        if (resolveosenviadaesperaadminlist != null) {
            resolveosenviadaesperaadminid = $q.defer();
            that.osenviadaesperaadminid = that.osenviadaesperaadminlist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaesperaadminid.resolve(that.osenviadaesperaadminid );
            return resolveosenviadaesperaadminid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEnviadaEncerradaAdmin = function() {
        resolveosenviadaencerradaadminlist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaencerradaadminlista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osenviadaencerradaadminlist = resp.data;
                resolveosenviadaencerradaadminlist.resolve(that.osenviadaencerradaadminlist);
            } else {
                loginService.logout();
            }            
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaencerradaadminlist.promise;
    }

    this.getOSInfoEnviadaEncerradaAdmin = function(id) {
        if (resolveosenviadaencerradaadminlist != null) {
            resolveosenviadaencerradaadminid = $q.defer();
            that.osenviadaencerradaadminid = that.osenviadaencerradaadminlist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaencerradaadminid.resolve(that.osenviadaencerradaadminid);
            return resolveosenviadaencerradaadminid.promise;
        } else {
            loginService.logout();
        }
    }
    // envidas
    this.getOSEnviadaNova = function() {
        resolveosenviadanovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadanovalista")
        .then (function (resp) {
            if (resp.data) {
                that.osenviadanovalist = resp.data;
                resolveosenviadanovalist.resolve(that.osenviadanovalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadanovalist.promise;
    }

    this.getOSInfoEnviadaNova = function(id) {
        if (resolveosenviadanovalist != null) {
            resolveosenviadanovaid = $q.defer();
            that.osenviadanovaid = that.osenviadanovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadanovaid.resolve(that.osenviadanovaid);
            return resolveosenviadanovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEnviadaAndamento = function() {
        resolveosenviadaandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaandamentolista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
               that.osenviadaandamentolist = resp.data;
                resolveosenviadaandamentolist.resolve(that.osenviadaandamentolist); 
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaandamentolist.promise;
    }

    this.getOSInfoEnviadaAndamento = function(id) {
        if (resolveosenviadaandamentolist != null) {
            resolveosenviadaandamentoid = $q.defer();
            that.osenviadaandamentoid = that.osenviadaandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaandamentoid.resolve(that.osenviadaandamentoid);
            return resolveosenviadaandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEnviadaEspera = function() {
        resolveosenviadaesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaesperalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osenviadaesperalist = resp.data;
                resolveosenviadaesperalist.resolve(that.osenviadaesperalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaesperalist.promise;
    }

    this.getOSInfoEnviadaEsperada = function(id) {
        if (resolveosenviadaesperalist != null) {
            resolveosenviadaesperaid = $q.defer();
            that.osenviadaesperaid = that.osenviadaesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaesperaid.resolve(that.osenviadaesperaid );
            return resolveosenviadaesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEnviadaEncerrada = function() {
        resolveosenviadaencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosenviadaencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osenviadaencerradalist = resp.data;
                resolveosenviadaencerradalist.resolve(that.osenviadaencerradalist); 
            } else {
                loginService.logout();
            }            
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosenviadaencerradalist.promise;
    }

    this.getOSInfoEnviadaEncerrada = function(id) {
        if (resolveosenviadaencerradalist != null) {
            resolveosenviadaencerradaid = $q.defer();
            that.osenviadaencerradaid = that.osenviadaencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosenviadaencerradaid.resolve(that.osenviadaencerradaid);
            return resolveosenviadaencerradaid.promise;
        } else {
            loginService.logout();
        }
    }
    // recebidas
    this.getOSRecebidaNova = function() {
        resolveosrecebidanovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidanovalista")
        .then (function (resp) {
            if (resp.data) {
                that.osrecebidanovalist = resp.data;
                resolveosrecebidanovalist.resolve(that.osrecebidanovalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidanovalist.promise;
    }

    this.getOSInfoRecebidaNova = function(id) {
        if (resolveosrecebidanovalist != null) {
            resolveosrecebidanovaid = $q.defer();
            that.osrecebidanovaid = that.osrecebidanovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidanovaid.resolve(that.osrecebidanovaid);
            return resolveosrecebidanovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaAndamento = function() {
        resolveosrecebidaandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaandamentolista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osrecebidaandamentolist = resp.data;
                resolveosrecebidaandamentolist.resolve(that.osrecebidaandamentolist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaandamentolist.promise;
    }

    this.getOSInfoRecebidaAndamento = function(id) {
        if (resolveosrecebidaandamentolist != null) {
            resolveosrecebidaandamentoid = $q.defer();
            that.osrecebidaandamentoid = that.osrecebidaandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaandamentoid.resolve(that.osrecebidaandamentoid);
            return resolveosrecebidaandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaEspera = function() {
        resolveosrecebidaesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaesperalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osrecebidaesperalist = resp.data;
                resolveosrecebidaesperalist.resolve(that.osrecebidaesperalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaesperalist.promise;
    }

    this.getOSInfoRecebidaEsperada = function(id) {
        if (resolveosrecebidaesperalist != null) {
            resolveosrecebidaesperaid = $q.defer();
            that.osrecebidaesperaid = that.osrecebidaesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaesperaid.resolve(that.osrecebidaesperaid );
            return resolveosrecebidaesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaEncerrada = function() {
        resolveosrecebidaencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osrecebidaencerradalist = resp.data;
                resolveosrecebidaencerradalist.resolve(that.osrecebidaencerradalist);
            } else {
                loginService.logout();
            }            
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidaencerradalist.promise;
    }

    this.getOSInfoRecebidaEncerrada = function(id) {
        if (resolveosrecebidaencerradalist != null) {
            resolveosrecebidaencerradaid = $q.defer();
            that.osrecebidaencerradaid = that.osrecebidaencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidaencerradaid.resolve(that.osrecebidaencerradaid);
            return resolveosrecebidaencerradaid.promise;
        } else {
            loginService.logout();
        }
    }

    // solicitante
    this.getOSSolicNova = function() {
        resolveossolicnovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicnovalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.ossolicnovalist = resp.data;
                resolveossolicnovalist.resolve(that.ossolicnovalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicnovalist.promise;
    }

    this.getOSInfoSolicNova = function(id) {
        if (resolveossolicnovalist != null) {
            resolveossolicnovaid = $q.defer();
            that.ossolicnovaid = that.ossolicnovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicnovaid.resolve(that.ossolicnovaid);
            return resolveossolicnovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSSolicAndamento = function() {
        resolveossolicandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicandamentolista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.ossolicandamentolist = resp.data;
                resolveossolicandamentolist.resolve(that.ossolicandamentolist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicandamentolist.promise;
    }

    this.getOSInfoSolicAndamento = function(id) {
        if (resolveossolicandamentolist != null) {
            resolveossolicandamentoid = $q.defer();
            that.ossolicandamentoid = this.ossolicandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicandamentoid.resolve(that.ossolicandamentoid);
            return resolveossolicandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSSolicEspera = function() {
        resolveossolicesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicesperalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.ossolicesperalist = resp.data;
                resolveossolicesperalist.resolve(that.ossolicesperalist); 
            } else {
                loginService.logout();
            }
            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicesperalist.promise;
    }

    this.getOSInfoSolicEspera = function(id) {
        if (resolveossolicesperalist != null) {
            resolveossolicesperaid = $q.defer();
            that.ossolicesperaid = that.ossolicesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicesperaid.resolve(that.ossolicesperaid );
            return resolveossolicesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSSolicEncerrada = function() {
        resolveossolicencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaossolicencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.ossolicencerradalist = resp.data;
                resolveossolicencerradalist.resolve(that.ossolicencerradalist); 
            } else {
                loginService.logout();
            }            
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveossolicencerradalist.promise;
    }

    this.getOSInfoSolicEncerrada = function(id) {
        if (resolveossolicencerradalist != null) {
            resolveossolicencerradaid = $q.defer();
            that.ossolicencerradaid = this.ossolicencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveossolicencerradaid.resolve(that.ossolicencerradaid);
            return resolveossolicencerradaid.promise;
        } else {
            loginService.logout();
        }
    }

     // Admin - laudo alterado
     this.getOSEditadaLaudoNova = function() {
        resolveoseditadalaudonovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudonovalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.oseditadalaudonovalist = resp.data;
                resolveoseditadalaudonovalist.resolve(that.oseditadalaudonovalist);
            } else {
                loginService.logout();
            }            
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudonovalist.promise;
    }

    this.getOSInfoEditadaLaudoNova = function(id) {
        if (resolveoseditadalaudonovalist != null) {
            resolveoseditadalaudonovaid = $q.defer();
            that.oseditadalaudonovaid = that.oseditadalaudonovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudonovaid.resolve(that.oseditadalaudonovaid);
            return resolveoseditadalaudonovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEditadaLaudoAndamento = function() {
        resolveoseditadalaudoandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoandamentolista")
        .then (function (resp) {            
            if (resp.data !== 'OFF') {
                that.oseditadalaudoandamentolist = resp.data;
                resolveoseditadalaudoandamentolist.resolve(that.oseditadalaudoandamentolist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoandamentolist.promise;
    }

    this.getOSInfoEditadaLaudoAndamento = function(id) {
        if (resolveoseditadalaudoandamentolist != null) {
            resolveoseditadalaudoandamentoid = $q.defer();
            that.oseditadalaudoandamentoid = that.oseditadalaudoandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoandamentoid.resolve(that.oseditadalaudoandamentoid);
            return resolveoseditadalaudoandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEditadaLaudoEspera = function() {
        resolveoseditadalaudoesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoesperalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.oseditadalaudoesperalist = resp.data;
                resolveoseditadalaudoesperalist.resolve(that.oseditadalaudoesperalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoesperalist.promise;
    }

    this.getOSInfoEditadaLaudoEspera = function(id) {
        if (resolveoseditadalaudoesperalist != null) {
            resolveoseditadalaudoesperaid = $q.defer();
            that.oseditadalaudoesperaid = this.oseditadalaudoesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoesperaid.resolve(that.oseditadalaudoesperaid );
            return resolveoseditadalaudoesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSEditadaLaudoEncerrada = function() {
        resolveoseditadalaudoencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaoseditadalaudoencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.oseditadalaudoencerradalist = resp.data;
                resolveoseditadalaudoencerradalist.resolve(that.oseditadalaudoencerradalist);
            } else {
                loginService.logout();
            }
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveoseditadalaudoencerradalist.promise;
    }

    this.getOSInfoEditadaLaudoEncerrada = function(id) {
        if (resolveoseditadalaudoencerradalist != null) {
            resolveoseditadalaudoencerradaid = $q.defer();
            that.oseditadalaudoencerradaid = this.oseditadalaudoencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveoseditadalaudoencerradaid.resolve(that.oseditadalaudoencerradaid);
            return resolveoseditadalaudoencerradaid.promise;
        } else {
            loginService.logout();
        }
    }
    // recebida secr

    this.getOSRecebidaSecrNova = function() {
        resolveosrecebidasecrnovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidanovalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                that.osrecebidasecrnovalist = resp.data;
                resolveosrecebidasecrnovalist.resolve(that.osrecebidasecrnovalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidasecrnovalist.promise;
    }

    this.getOSInfoRecebidaSecrNova = function(id) {
        if (resolveosrecebidasecrnovalist != null) {
            resolveosrecebidasecrnovaid = $q.defer();
            that.osrecebidasecrnovaid = that.osrecebidasecrnovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidasecrnovaid.resolve(that.osrecebidasecrnovaid);
            return resolveosrecebidasecrnovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaSecrAndamento = function() {
        resolveosrecebidasecrandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaandamentolista")
        .then (function (resp) {
            if (resp.data) {
                that.osrecebidasecrandamentolist = resp.data;
                resolveosrecebidasecrandamentolist.resolve(that.osrecebidasecrandamentolist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidasecrandamentolist.promise;
    }

    this.getOSInfoRecebidaSecrAndamento = function(id) {
        if (resolveosrecebidasecrandamentolist != null) {
            resolveosrecebidasecrandamentoid = $q.defer();
            that.osrecebidasecrandamentoid = that.osrecebidasecrandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidasecrandamentoid.resolve(that.osrecebidasecrandamentoid);
            return resolveosrecebidasecrandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaSecrEspera = function() {
        resolveosrecebidasecresperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaesperalista")
        .then (function (resp) {
            if (resp.data) {
            that.osrecebidasecresperalist = resp.data;
            resolveosrecebidasecresperalist.resolve(that.osrecebidasecresperalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidasecresperalist.promise;
    }

    this.getOSInfoRecebidaSecrEspera = function(id) {
        if (resolveosrecebidasecresperalist != null) {
            resolveosrecebidasecresperaid = $q.defer();
            that.osrecebidasecresperaid = that.osrecebidasecresperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidasecresperaid.resolve(that.osrecebidasecresperaid );
            return resolveosrecebidasecresperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaSecrEncerrada = function() {
        resolveosrecebidasecrencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidaencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
            that.osrecebidasecrencerradalist = resp.data;
            resolveosrecebidasecrencerradalist.resolve(that.osrecebidasecrencerradalist);
            } else {
                loginService.logout();
            }
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidasecrencerradalist.promise;
    }

    this.getOSInfoRecebidaSecrEncerrada = function(id) {
        if (resolveosrecebidasecrencerradalist != null) {
            resolveosrecebidasecrencerradaid = $q.defer();
            that.osrecebidasecrencerradaid = that.osrecebidasecrencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidasecrencerradaid.resolve(that.osrecebidasecrencerradaid);
            return resolveosrecebidasecrencerradaid.promise;
        } else {
            loginService.logout();
        }
    }
    // recebida responsável
    this.getOSRecebidaRespNova = function() {
        resolveosrecebidarespnovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidarespnovalista")
        .then (function (resp) {
            console.log(resp.data);
            if (resp.data !== 'OFF') {
            that.osrecebidarespnovalist = resp.data;
            resolveosrecebidarespnovalist.resolve(that.osrecebidarespnovalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidarespnovalist.promise;
    }

    this.getOSInfoRecebidaRespNova = function(id) {
        if (resolveosrecebidarespnovalist != null) {
            resolveosrecebidarespnovaid = $q.defer();
            that.osrecebidarespnovaid = that.osrecebidarespnovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidarespnovaid.resolve(that.osrecebidarespnovaid);
            return resolveosrecebidarespnovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaRespAndamento = function() {
        resolveosrecebidarespandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidarespandamentolista")
        .then (function (resp) {
            console.log(resp.data);
            if (resp.data !== 'OFF') {
            that.osrecebidarespandamentolist = resp.data;
            resolveosrecebidarespandamentolist.resolve(that.osrecebidarespandamentolist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidarespandamentolist.promise;
    }

    this.getOSInfoRecebidaRespAndamento = function(id) {
        if (resolveosrecebidarespandamentolist != null) {
            resolveosrecebidarespandamentoid = $q.defer();
            that.osrecebidarespandamentoid = that.osrecebidarespandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidarespandamentoid.resolve(that.osrecebidarespandamentoid);
            return resolveosrecebidarespandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaRespEspera = function() {
        resolveosrecebidarespesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidarespesperalista")
        .then (function (resp) {
            console.log(resp.data);
            if (resp.data !== 'OFF') {
            that.osrecebidarespesperalist = resp.data;
            resolveosrecebidarespesperalist.resolve(that.osrecebidarespesperalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidarespesperalist.promise;
    }

    this.getOSInfoRecebidaRespEspera = function(id) {
        if (resolveosrecebidarespesperalist != null) {
            resolveosrecebidarespesperaid = $q.defer();
            that.osrecebidarespesperaid = that.osrecebidarespesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidarespesperaid.resolve(that.osrecebidarespesperaid );
            return resolveosrecebidarespesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaRespEncerrada = function() {
        resolveosrecebidarespencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidarespencerradalista")
        .then (function (resp) {
            console.log(resp.data);
            if (resp.data !== 'OFF') {
            that.osrecebidarespencerradalist = resp.data;
            resolveosrecebidarespencerradalist.resolve(that.osrecebidarespencerradalist);
            } else {
                loginService.logout();
            }
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidarespencerradalist.promise;
    }

    this.getOSInfoRecebidaRespEncerrada = function(id) {
        if (resolveosrecebidarespencerradalist != null) {
            resolveosrecebidarespencerradaid = $q.defer();
            that.osrecebidarespencerradaid = that.osrecebidarespencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidarespencerradaid.resolve(that.osrecebidarespencerradaid);
            return resolveosrecebidarespencerradaid.promise;
        } else {
            loginService.logout();
        }
    }
    // recebida Técnico
    this.getOSRecebidaTecNova = function() {
        resolveosrecebidatecnovalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidatecnovalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                console.log(resp.data);
            that.osrecebidatecnovalist = resp.data;
            resolveosrecebidatecnovalist.resolve(that.osrecebidatecnovalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidatecnovalist.promise;
    }

    this.getOSInfoRecebidaTecNova = function(id) {
        if (resolveosrecebidatecnovalist != null) {
            resolveosrecebidatecnovaid = $q.defer();
            that.osrecebidatecnovaid = that.osrecebidatecnovalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidatecnovaid.resolve(that.osrecebidatecnovaid);
            return resolveosrecebidatecnovaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaTecAndamento = function() {
        resolveosrecebidatecandamentolist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidatecandamentolista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                console.log(resp.data);
            that.osrecebidatecandamentolist = resp.data;
            resolveosrecebidatecandamentolist.resolve(that.osrecebidatecandamentolist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidatecandamentolist.promise;
    }

    this.getOSInfoRecebidaTecAndamento = function(id) {
        if (resolveosrecebidatecandamentolist != null) {
            resolveosrecebidatecandamentoid = $q.defer();
            that.osrecebidatecandamentoid = that.osrecebidatecandamentolist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidatecandamentoid.resolve(that.osrecebidatecandamentoid);
            return resolveosrecebidatecandamentoid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaTecEspera = function() {
        resolveosrecebidatecesperalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidatecesperalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                console.log(resp.data);
            that.osrecebidatecesperalist = resp.data;
            resolveosrecebidatecesperalist.resolve(that.osrecebidatecesperalist);
            } else {
                loginService.logout();
            }
        })
        .catch(function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidatecesperalist.promise;
    }

    this.getOSInfoRecebidaTecEspera = function(id) {
        if (resolveosrecebidatecesperalist != null) {
            resolveosrecebidatecesperaid = $q.defer();
            that.osrecebidatecesperaid = that.osrecebidatecesperalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidatecesperaid.resolve(that.osrecebidatecesperaid );
            return resolveosrecebidatecesperaid.promise;
        } else {
            loginService.logout();
        }
    }

    this.getOSRecebidaTecEncerrada = function() {
        resolveosrecebidatecencerradalist = $q.defer();
        $http.get("/app/data/app.php?d=retornaosrecebidatecencerradalista")
        .then (function (resp) {
            if (resp.data !== 'OFF') {
                console.log(resp.data);
            that.osrecebidatecencerradalist = resp.data;
            resolveosrecebidatecencerradalist.resolve(that.osrecebidatecencerradalist);
            } else {
                loginService.logout();
            }
        })
        .catch (function (e) {
            console.log("Um erro ocorreu -", e);
            throw e;
        })
        return resolveosrecebidatecencerradalist.promise;
    }

    this.getOSInfoRecebidaTecEncerrada = function(id) {
        if (resolveosrecebidatecencerradalist != null) {
            resolveosrecebidatecencerradaid = $q.defer();
            that.osrecebidatecencerradaid = that.osrecebidatecencerradalist.find(function (ordem) {return ordem.id_os === id;});
            resolveosrecebidatecencerradaid.resolve(that.osrecebidatecencerradaid);
            return resolveosrecebidatecencerradaid.promise;
        } else {
            loginService.logout();
        }
    }

    // Resposável - laudo alterado
    this.getOSEditadaLaudoRespNova = function() {
        console.log("teste 1");
       resolveoseditadalaudorespnovalist = $q.defer();
       $http.get("/app/data/app.php?d=retornaoseditadalaudonovalista")
       .then (function (resp) {
           if (resp.data !== 'OFF') {
           that.oseditadalaudorespnovalist = resp.data;
           resolveoseditadalaudorespnovalist.resolve(that.oseditadalaudorespnovalist);
           } else {
            loginService.logout();
           }
       })
       .catch(function (e) {
           console.log("Um erro ocorreu -", e);
           throw e;
       })
       return resolveoseditadalaudorespnovalist.promise;
   }

   this.getOSInfoEditadaLaudoRespNova = function(id) {
       console.log("teste");
       if (resolveoseditadalaudorespnovalist != null) {
           resolveoseditadalaudorespnovaid = $q.defer();
           that.oseditadalaudorespnovaid = that.oseditadalaudorespnovalist.find(function (ordem) {return ordem.id_os === id;});
           resolveoseditadalaudorespnovaid.resolve(that.oseditadalaudorespnovaid);
           return resolveoseditadalaudorespnovaid.promise;
       } else {
        loginService.logout();
       }
   }

   this.getOSEditadaLaudoRespAndamento = function() {
       resolveoseditadalaudorespandamentolist = $q.defer();
       $http.get("/app/data/app.php?d=retornaoseditadalaudoandamentolista")
       .then (function (resp) {
           if (resp.data !== 'OFF') {
           that.oseditadalaudorespandamentolist = resp.data;
           resolveoseditadalaudorespandamentolist.resolve(that.oseditadalaudorespandamentolist);
           } else {
            loginService.logout();
           }
       })
       .catch(function (e) {
           console.log("Um erro ocorreu -", e);
           throw e;
       })
       return resolveoseditadalaudorespandamentolist.promise;
   }

   this.getOSInfoEditadaLaudoRespAndamento = function(id) {
       if (resolveoseditadalaudorespandamentolist != null) {
           resolveoseditadalaudorespandamentoid = $q.defer();
           that.oseditadalaudorespandamentoid = that.oseditadalaudorespandamentolist.find(function (ordem) {return ordem.id_os === id;});
           resolveoseditadalaudorespandamentoid.resolve(that.oseditadalaudorespandamentoid);
           return resolveoseditadalaudorespandamentoid.promise;
       } else {
        loginService.logout();
       }
   }

   this.getOSEditadaLaudoRespEspera = function() {
       resolveoseditadalaudorespesperalist = $q.defer();
       $http.get("/app/data/app.php?d=retornaoseditadalaudoesperalista")
       .then (function (resp) {
           if (resp.data !== 'OFF') {
           that.oseditadalaudorespesperalist = resp.data;
           resolveoseditadalaudorespesperalist.resolve(that.oseditadalaudorespesperalist);
           } else {
            loginService.logout();
           }
       })
       .catch(function (e) {
           console.log("Um erro ocorreu -", e);
           throw e;
       })
       return resolveoseditadalaudorespesperalist.promise;
   }

   this.getOSInfoEditadaLaudoRespEspera = function(id) {
       if (resolveoseditadalaudorespesperalist != null) {
           resolveoseditadalaudorespesperaid = $q.defer();
           that.oseditadalaudorespesperaid = this.oseditadalaudorespesperalist.find(function (ordem) {return ordem.id_os === id;});
           resolveoseditadalaudorespesperaid.resolve(that.oseditadalaudorespesperaid );
           return resolveoseditadalaudorespesperaid.promise;
       } else {
            loginService.logout();
       }
   }

   this.getOSEditadaLaudoRespEncerrada = function() {
       resolveoseditadalaudorespencerradalist = $q.defer();
       $http.get("/app/data/app.php?d=retornaoseditadalaudoencerradalista")
       .then (function (resp) {
           if (resp.data !== 'OFF') {
           that.oseditadalaudorespencerradalist = resp.data;
           resolveoseditadalaudorespencerradalist.resolve(that.oseditadalaudorespencerradalist);
           } else {
            loginService.logout();
           }
       })
       .catch (function (e) {
           console.log("Um erro ocorreu -", e);
           throw e;
       })
       return resolveoseditadalaudorespencerradalist.promise;
   }

   this.getOSInfoEditadaLaudoRespEncerrada = function(id) {
       if (resolveoseditadalaudorespencerradalist != null) {
           resolveoseditadalaudorespencerradaid = $q.defer();
           that.oseditadalaudorespencerradaid = this.oseditadalaudorespencerradalist.find(function (ordem) {return ordem.id_os === id;});
           resolveoseditadalaudorespencerradaid.resolve(that.oseditadalaudorespencerradaid);
           return resolveoseditadalaudorespencerradaid.promise;
       } else {
            loginService.logout();
       }
   }

   // Tecnico - laudo alterado
   this.getOSEditadaLaudoTecNova = function() {
      resolveoseditadalaudotecnovalist = $q.defer();
      $http.get("/app/data/app.php?d=retornaoseditadalaudonovalista")
      .then (function (resp) {
          if (resp.data !== 'OFF') {
          that.oseditadalaudotecnovalist = resp.data;
          resolveoseditadalaudotecnovalist.resolve(that.oseditadalaudotecnovalist);
          } else {
            loginService.logout();
          }
      })
      .catch(function (e) {
          console.log("Um erro ocorreu -", e);
          throw e;
      })
      return resolveoseditadalaudotecnovalist.promise;
  }

  this.getOSInfoEditadaLaudoTecNova = function(id) {
      if (resolveoseditadalaudotecnovalist != null) {
          resolveoseditadalaudotecnovaid = $q.defer();
          that.oseditadalaudotecnovaid = that.oseditadalaudotecnovalist.find(function (ordem) {return ordem.id_os === id;});
          resolveoseditadalaudotecnovaid.resolve(that.oseditadalaudotecnovaid);
          return resolveoseditadalaudotecnovaid.promise;
      } else {
        loginService.logout();
      }
  }

  this.getOSEditadaLaudoTecAndamento = function() {
      resolveoseditadalaudotecandamentolist = $q.defer();
      $http.get("/app/data/app.php?d=retornaoseditadalaudoandamentolista")
      .then (function (resp) {
          if (resp.data !== 'OFF') {
          that.oseditadalaudotecandamentolist = resp.data;
          resolveoseditadalaudotecandamentolist.resolve(that.oseditadalaudotecandamentolist);
          } else {
            loginService.logout();
          }
      })
      .catch(function (e) {
          console.log("Um erro ocorreu -", e);
          throw e;
      })
      return resolveoseditadalaudotecandamentolist.promise;
  }

  this.getOSInfoEditadaLaudoTecAndamento = function(id) {
      if (resolveoseditadalaudotecandamentolist != null) {
          resolveoseditadalaudotecandamentoid = $q.defer();
          that.oseditadalaudotecandamentoid = that.oseditadalaudotecandamentolist.find(function (ordem) {return ordem.id_os === id;});
          resolveoseditadalaudotecandamentoid.resolve(that.oseditadalaudotecandamentoid);
          return resolveoseditadalaudotecandamentoid.promise;
      } else {
        loginService.logout();
      }
  }

  this.getOSEditadaLaudoTecEspera = function() {
      resolveoseditadalaudotecesperalist = $q.defer();
      $http.get("/app/data/app.php?d=retornaoseditadalaudoesperalista")
      .then (function (resp) {
          if (resp.data !== 'OFF') {
          that.oseditadalaudotecesperalist = resp.data;
          resolveoseditadalaudotecesperalist.resolve(that.oseditadalaudotecesperalist);
          } else {
            loginService.logout();
          }
      })
      .catch(function (e) {
          console.log("Um erro ocorreu -", e);
          throw e;
      })
      return resolveoseditadalaudotecesperalist.promise;
  }

  this.getOSInfoEditadaLaudoTecEspera = function(id) {
      if (resolveoseditadalaudotecesperalist != null) {
          resolveoseditadalaudotecesperaid = $q.defer();
          that.oseditadalaudotecesperaid = this.oseditadalaudotecesperalist.find(function (ordem) {return ordem.id_os === id;});
          resolveoseditadalaudotecesperaid.resolve(that.oseditadalaudotecesperaid );
          return resolveoseditadalaudotecesperaid.promise;
      } else {
        loginService.logout();
      }
  }

  this.getOSEditadaLaudoTecEncerrada = function() {
      resolveoseditadalaudotecencerradalist = $q.defer();
      $http.get("/app/data/app.php?d=retornaoseditadalaudoencerradalista")
      .then (function (resp) {
          if (resp.data !== 'OFF') {
          that.oseditadalaudotecencerradalist = resp.data;
          resolveoseditadalaudotecencerradalist.resolve(that.oseditadalaudotecencerradalist);
          } else {
            loginService.logout();
          }
      })
      .catch (function (e) {
          console.log("Um erro ocorreu -", e);
          throw e;
      })
      return resolveoseditadalaudotecencerradalist.promise;
  }

  this.getOSInfoEditadaLaudoTecEncerrada = function(id) {
      if (resolveoseditadalaudotecencerradalist != null) {
          resolveoseditadalaudotecencerradaid = $q.defer();
          that.oseditadalaudotecencerradaid = this.oseditadalaudotecencerradalist.find(function (ordem) {return ordem.id_os === id;});
          resolveoseditadalaudotecencerradaid.resolve(that.oseditadalaudotecencerradaid);
          return resolveoseditadalaudotecencerradaid.promise;
      } else {
        loginService.logout();
      }
  }
})
.service('Download', function ($http) {
    return {
        getFile : function (path) {
            $http.post("/app/data/download.php", {'path' : path});
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
