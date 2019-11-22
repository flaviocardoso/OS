'use strict';

var mensagensDeErro = "Dados não recebidos";

angular.module('app')
.service('CoordService', function($http, toaster, $q, loginService, $window, $state) {
    return {
        getCoord: function($scope) {
            $http.get("/app/data/app.php?d=dataCoord")
            .then(function(resp) {
                if (resp.data.session == 'ON') {
                    $scope.coorddados = resp.data.data;                   
                }              
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        getSetorbycoord: function(coord, $scope) {
            var resolve = $q.defer();
            $http.post("/app/data/app.php?d=dataSetor", { "coord": coord })
            .then(function(resp) {console.log(resp);
                if (resp.data.session == 'ON') {
                    $scope.setordados = resp.data.data;
                    resolve.resolve(resp.data.data);
                }              
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
                }              
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });

            return resolve.promise;
        },
        getAreabysubsetor: function(subsetor, $scope) {
            $http.post("/app/data/app.php?d=dataArea", { "subsetor": subsetor })
            .then(function(resp) {console.log(resp);
                if (resp.data.session = 'ON') {
                    $scope.areadados = resp.data.data;
                }              
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        getCoordSolic: function($scope) {
            $http.get("/app/data/app.php?d=dataCoord")
            .then(function(resp) {
                if (resp.data.session == 'ON') {
                    $scope.coorddadosSolic = resp.data.data;
                } else {
                    loginService.logout();
                }               
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        postCriarOS: function(service) {
            $http.post("/app/data/app.php?d=criarOS", service)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                } else {
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        desativarNivel: function(user) {
            $http.post("/app/data/app.php?d=desativarNivel", user)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        editeUserGrupo: function(data) {
            $http.post("/app/data/app.php?d=editeUserGrupoOS", data)
            .then(function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('success', "", resp.data.msg, 10000, 'trustedHtml');
                    $state.go('dashboard.os');
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .then(function(resp) {
                if (resp.data.session == 'ON') {
                    return resp.data.data;
                } else {
                    loginService.logout();
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        editOsNova: function(os) {
            $http.post("/app/data/app.php?d=editarOS", os)
            .then (function (resp) {
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
                
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        parseViews : function (obj) {
            $http.post("/app/data/app.php?d=insert-views-novas-os", obj)
            .then(function (resp) {                
                if (resp.data.session == 'ON') {
                } else {
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });            
        },
        esperaOs: function (obj) {
            $http.post("/app/data/app.php?d=por-os-em-espera", obj)
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
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
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });
        },
        verSolicitante: function(e) {
            var retorno = $http.post('/app/data/app.php?d=versolicitante', {'useremail': e});
            return retorno;            
        },
        criarSolicitante: function (OS) {
            $http.post('/app/data/app.php?d=criarSolicitante', {'data': OS})
            .then (function (resp) {
                if (resp.data.session == 'ON') {
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');                    
                } else {
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
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
                    toaster.pop('info', "", resp.data.msg, 10000, 'trustedHtml');
                }
            })
            .catch(function (error) {
                toaster.pop('error', "", mensagensDeErro, 10000, 'trustedHtml');
            });

            return resolve.promise;
        }
    }
})