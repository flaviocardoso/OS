// serviços
'use strict';

angular.module('app')
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