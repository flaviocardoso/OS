'use strict';

angular.module('app', ['ui.router', 'ngAnimate', 'ngProgress', 'toaster'])
    // configuração
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, roleContextHelperProvider) {
        // retira o "#" para enabled true e base para uma requiredBase true
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
        // variavel que contém os estados para ser carregado ele aplicação
        var states = [
            {
                name: 'login', /* login */
                url: '/',
                data: { title: 'Login CBPF/OS', nome: 'Entrar' },
                component: 'login'
            },
            { 
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
                data: { 
                    title: 'OS',
                    nome: 'OS' 
                },
                controller: 'osCtrl'
            }, 
            {
                name: 'dashboard.criaros', /* criar handler */
                url: '/criaros',
                data: { title: 'CRIAR OS', nome: "Criar OS" },
                component: 'criaros'
            },
            {
                name: 'dashboard.criaros.solic',
                url: '-solic', /* criar-solic handler */
                component: 'criarossolic',
                data: { nome: "Solicitante" }
            },
            {
                name: 'dashboard.criaros.dest',
                url: '-dest', /* criar-desc handler */
                component: 'criarosdest',
                data: { nome: "Destinação" }
            },
            { 
                name: 'dashboard.criaros.descr',
                url: '-descr', /* criar-descr */
                component: 'criarosdescr',
                data: { nome: "Descrição" }
            },
            {
                name: 'dashboard.criartec',
                url: '/criartec',
                component: 'criartec',
                data: { 
                    title: 'Criar User OS', 
                    nome: 'Criar User OS'
                },
            },
            { 
                name: 'dashboard.criargrupo',
                url: '/criargrupo',
                component: 'criargrupo',
                data: { 
                    title: 'Criar User sem grupo', 
                    nome: 'Criar User sem grupo' 
                },
            },
            {
                name: 'dashboard.criarinfo',
                url: '/criarinfo',
                component: 'criarinfo',
                data: { 
                    title: 'Criar User Geral', 
                    nome: 'Criar User Geral' 
                },
            },
            { 
                name: 'dashboard.editeteclista',
                url: '/editeteclista',
                component: 'editeteclista',
                data: {
                    title: 'Lista de Técnicos', 
                    nome: 'Lista de Técnicos'
                },
                resolve: { 
                    verTecList: function(OrdemService) { 
                        return OrdemService.getTecList(); 
                    } 
                }
            },
            {
                name: 'dashboard.editetec',
                url: '/editetec/{tecID}',
                component: 'editetec',
                data: { 
                    title: 'Edite Técnico', 
                    nome: 'Edite Técnico' 
                },
                resolve: { 
                    tecid: function(OrdemService, $transition$) { 
                        return OrdemService.getTecEditar($transition$.params().tecID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver',
                url: '/ver-os', /* direção para lista das ordens de servicos */
                data: { 
                    title: 'Ordens de Serviço', 
                    nome : "S. Ordem de Serviço" 
                },
                component: 'ver'
            },
            {
                name: 'dashboard.ver.enviadavernovaadmin',
                url: '/',
                component: 'enviadavernovaadmin',
                data: {
                    title: 'Nova', 
                    nome: 'Nova'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaNovaAdmin(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaverandamentoadmin',
                url: '/',
                component: 'enviadaverandamentoadmin',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaAndamentoAdmin(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaveresperaadmin',
                url: '/',
                component: 'enviadaveresperaadmin',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaEsperaAdmin(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaverencerradaadmin',
                url: '/',
                component: 'enviadaverencerradaadmin',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaEncerradaAdmin(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadavernovaadmin',
                url: '/info-enviada-nova/{osID}',
                component: 'infoenviadavernovaadmin',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaNovaAdmin($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaverandamentoadmin',
                url: '/info-enviada-andamento/{osID}',
                component: 'infoenviadaverandamentoadmin',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaAndamentoAdmin($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaveresperaadmin',
                url: '/info-enviada-espera/{osID}',
                component: 'infoenviadaveresperaadmin',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaEsperadaAdmin($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaverencerradaadmin',
                url: '/info-enviada-encerrada/{osID}',
                component: 'infoenviadaverencerradaadmin',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaEncerradaAdmin($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadavernova',
                url: '/',
                component: 'enviadavernova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaverandamento',
                url: '/',
                component: 'enviadaverandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaverespera',
                url: '/',
                component: 'enviadaverespera',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.enviadaverencerrada',
                url: '/',
                component: 'enviadaverencerrada',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEnviadaEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadavernova',
                url: '/info-enviada-nova/{osID}',
                component: 'infoenviadavernova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaverandamento',
                url: '/info-enviada-andamento/{osID}',
                component: 'infoenviadaverandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaverespera',
                url: '/info-enviada-espera/{osID}',
                component: 'infoenviadaverespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaEsperada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.infoenviadaverencerrada',
                url: '/info-enviada-encerrada/{osID}',
                component: 'infoenviadaverencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEnviadaEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidavernova',
                url: '/',
                component: 'recebidavernova',
                data: {
                    title: 'Nova', 
                    nome: 'Nova'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverandamento',
                url: '/',
                component: 'recebidaverandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverespera',
                url: '/',
                component: 'recebidaverespera',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverencerrada',
                url: '/',
                component: 'recebidaverencerrada',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavernova',
                url: '/info-recebida-nova/{osID}',
                component: 'inforecebidavernova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavernovaedite',
                url: '/info-recebida-nova/{osID}/edite',
                component: 'editenova',
                data: {
                    title: 'Edite Ordem de Serviço', 
                    nome: 'Edite Ordem de Serviço'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverandamento',
                url: '/info-recebida-andamento/{osID}',
                component: 'inforecebidaverandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverespera',
                url: '/info-recebida-espera/{osID}',
                component: 'inforecebidaverespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaEsperada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverencerrada',
                url: '/info-recebida-encerrada/{osID}',
                component: 'inforecebidaverencerrada',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudovernova',
                url: '/',
                component: 'editadalaudovernova',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudonova',
                url: '/info-editada-nova/{osID}',
                component: 'infoeditadalaudonova',
                data: {title: 'Informação Nova', nome: 'Informação Nova'},
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverandamento',
                url: '/',
                component: 'editadalaudoverandamento',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudoandamento',
                url: '/info-editada-andamento/{osID}',
                component: 'infoeditadalaudoandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverespera',
                url: '/',
                component: 'editadalaudoverespera',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudoespera',
                url: '/info-editada-espera/{osID}',
                component: 'infoeditadalaudoespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverencerrada',
                url: '/',
                component: 'editadalaudoverencerrada',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudoencerrada',
                url: '/info-editada-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.solicvernova',
                url: '/',
                component: 'solicvernova',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSSolicNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.infosolicnova',
                url: '/info-os-solic-nova/{osID}',
                component: 'infosolicnova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoSolicNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.solicverandamento',
                url: '/',
                component: 'solicverandamento',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSSolicAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.infosolicandamento',
                url: '/info-os-solic-andameto/{osID}',
                component: 'infosolicandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoSolicAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.solicverespera',
                url: '/',
                component: 'solicverespera',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSSolicEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.infosolicespera',
                url: '/info-os-solic-espera/{osID}',
                component: 'infosolicespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoSolicEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.solicverencerrada',
                url: '/',
                component: 'solicverencerrada',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSSolicEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infosolicencerrada',
                url: '/info-os-solic-encerrada/{osID}',
                component: 'infosolicencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoSolicEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaversecrnova',
                url: '/',
                component: 'recebidaversecrnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaSecrNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaversecrnova',
                url: '/info-recebida-secr-nova/{osID}',
                component: 'inforecebidaversecrnova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaSecrNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaversecrandamento',
                url: '/',
                component: 'recebidaversecrandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaSecrAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaversecrandamento',
                url: '/info-recebida-secr-andamento/{osID}',
                component: 'inforecebidaversecrandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaSecrAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaversecrespera',
                url: '/',
                component: 'recebidaversecrespera',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaSecrEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaversecrespera',
                url: '/info-recebida-secr-espera/{osID}',
                component: 'inforecebidaversecrespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaSecrEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaversecrencerrada',
                url: '/',
                component: 'recebidaversecrencerrada',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaSecrEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaversecrencerrada',
                url: '/info-recebida-secr-encerrada/{osID}',
                component: 'inforecebidaversecrencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaSecrEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrnova',
                url: '/',
                component: 'editadalaudoversecrnova',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoSecrNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudosecrnova',
                url: '/info-editada-secr-nova/{osID}',
                component: 'infoeditadalaudosecrnova',
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoSecrNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrandamento',
                url: '/',
                component: 'editadalaudoversecrandamento',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoSecrAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudosecrandamento',
                url: '/info-editada-secr-andamento/{osID}',
                component: 'infoeditadalaudosecrandamento',
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoSecrAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrespera',
                url: '/',
                component: 'editadalaudoversecrespera',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoSecrEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudosecrespera',
                url: '/info-editada-secr-espera/{osID}',
                component: 'infoeditadalaudosecrespera',
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoSecrEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoversecrencerrada',
                url: '/',
                component: 'editadalaudoversecrencerrada',
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoSecrEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudosecrencerrada',
                url: '/info-editada-secr-encerrada/{osID}',
                component: 'infoeditadalaudoencerrada',
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoSecrEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverrespnova',
                url: '/',
                component: 'recebidaverrespnova',
                data: {title: 'Nova', nome: 'Nova'},
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaRespNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverrespnova',
                url: '/info-recebida-resp-nova/{osID}',
                component: 'inforecebidaverrespnova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaRespNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverrespandamento',
                url: '/',
                component: 'recebidaverrespandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaRespAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverrespandamento',
                url: '/info-recebida-resp-andamento/{osID}',
                component: 'inforecebidaverrespandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaRespAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverrespespera',
                url: '/',
                component: 'recebidaverrespespera',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaRespEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverrespespera',
                url: '/info-recebida-resp-espera/{osID}',
                component: 'inforecebidaverrespespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaRespEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidaverrespencerrada',
                url: '/',
                component: 'recebidaverrespencerrada',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaRespEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidaverrespencerrada',
                url: '/info-recebida-resp-encerrada/{osID}',
                component: 'inforecebidaverrespencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaRespEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespnova',
                url: '/',
                component: 'editadalaudoverrespnova',
                data: {
                    title: "Nova", 
                    nome: "Nova"
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoRespNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudorespnova',
                url: '/info-editada-resp-nova/{osID}',
                component: 'infoeditadalaudorespnova',
                data: {
                    title: "Info Nova", 
                    nome: "Info Nova"
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoRespNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespandamento',
                url: '/',
                component: 'editadalaudoverrespandamento',
                data: {
                    title: "Andamento", 
                    nome: "Andamento"
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoRespAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudorespandamento',
                url: '/info-editada-resp-andamento/{osID}',
                component: 'infoeditadalaudorespandamento',
                data: {
                    title: "Info Andamento", 
                    nome: "Info Andamento"
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoRespAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespespera',
                url: '/',
                component: 'editadalaudoverrespespera',
                data: {
                    title: "Espera", 
                    nome: "Espera"
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoRespEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudorespespera',
                url: '/info-editada-resp-espera/{osID}',
                component: 'infoeditadalaudorespespera',
                data: {
                    title: "Info Espera", 
                    nome: "Info Espera"
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoRespEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudoverrespencerrada',
                url: '/',
                component: 'editadalaudoverrespencerrada',
                data: {
                    title: "Encerrada", 
                    nome: "Encerrada"
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoRespEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudorespencerrada',
                url: '/info-editada-resp-encerrada/{osID}',
                component: 'infoeditadalaudorespencerrada',
                data: {
                    title: "Info Encerrada", 
                    nome: "Info Encerrada"
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoRespEncerrada($transition$.params().osID) 
                    } 
                }
            }, // Técnico OS
            {
                name: 'dashboard.ver.recebidavertecnova',
                url: '/',
                component: 'recebidavertecnova',
                data: {
                    title: 'Nova', 
                    nome: 'Nova'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaTecNova(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavertecnova',
                url: '/info-recebida-tec-nova/{osID}',
                component: 'inforecebidavertecnova',
                data: {
                    title: 'Informação Nova', 
                    nome: 'Informação Nova'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaTecNova($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidavertecandamento',
                url: '/',
                component: 'recebidavertecandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaTecAndamento();
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavertecandamento',
                url: '/info-recebida-tec-andamento/{osID}',
                component: 'inforecebidavertecandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaTecAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidavertecespera',
                url: '/',
                component: 'recebidavertecespera',
                data: {
                    title: 'Espera', 
                    nome: 'Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaTecEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavertecespera',
                url: '/info-recebida-tec-espera/{osID}',
                component: 'inforecebidavertecespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaTecEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.recebidavertecencerrada',
                url: '/',
                component: 'recebidavertecencerrada',
                data: {
                    title: 'Encerrada', 
                    nome: 'Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSRecebidaTecEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.inforecebidavertecencerrada',
                url: '/info-recebida-tec-encerrada/{osID}',
                component: 'inforecebidavertecencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoRecebidaTecEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
              name: 'dashboard.ver.editadalaudovertecnova',
              url: '/',
              component: 'editadalaudovertecnova',
              data: {
                  title: 'Novas', 
                  nome: 'Novas'
                },
              resolve: { 
                  verOs: function(OrdemService) { 
                      return OrdemService.getOSEditadaLaudoTecNova();
                    }
                }
            },
            {
              name: 'dashboard.infoeditadalaudotecnova',
              url: '/info-editada-tec-nova/{osID}',
              component: 'infoeditadalaudotecnova',
              data: {
                  title: 'Informação Novas', 
                  nome: 'Informação Novas'
                },
              resolve: {
                  osid: function(OrdemService, $transition$) { 
                      return OrdemService.getOSInfoEditadaLaudoTecNova($transition$.params().osID)
                    }
                }
            },
            {
                name: 'dashboard.ver.editadalaudovertecandamento',
                url: '/',
                component: 'editadalaudovertecandamento',
                data: {
                    title: 'Andamento', 
                    nome: 'Andamento'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoTecAndamento(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudotecandamento',
                url: '/info-editada-tec-andamento/{osID}',
                component: 'infoeditadalaudotecandamento',
                data: {
                    title: 'Informação Andamento', 
                    nome: 'Informação Andamento'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoTecAndamento($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudovertecespera',
                url: '/',
                component: 'editadalaudovertecespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoTecEspera(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudotecespera',
                url: '/info-editada-tec-espera/{osID}',
                component: 'infoeditadalaudotecespera',
                data: {
                    title: 'Informação Espera', 
                    nome: 'Informação Espera'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoTecEspera($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.ver.editadalaudovertecencerrada',
                url: '/',
                component: 'editadalaudovertecencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    verOs: function(OrdemService) { 
                        return OrdemService.getOSEditadaLaudoTecEncerrada(); 
                    } 
                }
            },
            {
                name: 'dashboard.infoeditadalaudotecencerrada',
                url: '/info-editada-tec-encerrada/{osID}',
                component: 'infoeditadalaudotecencerrada',
                data: {
                    title: 'Informação Encerrada', 
                    nome: 'Informação Encerrada'
                },
                resolve: { 
                    osid: function(OrdemService, $transition$) { 
                        return OrdemService.getOSInfoEditadaLaudoTecEncerrada($transition$.params().osID) 
                    } 
                }
            },
            {
                name: 'dashboard.sobre', 
                url: '/sobre',
                data: { 
                    title: 'SOBRE CBPF/OS', 
                    nome: 'Sobre'
                },
                component: 'sobre'
            },
            { 
                name: 'dashboard.contato',
                url: '/contato',
                data: { 
                    title: 'CONTATO CBPF/OS', 
                    nome: "Contato"
                },
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