<!DOCTYPE html>
<html ng-app="app">
  <head>
    <meta name="viewport" content="width=device-width initial-scale=1 maximum-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html" charset="utf-8" />
    <meta http-equiv="content-language" content="pt-br" />
    <title>CBPF OS</title> 
    <base href="/">
    
    <link rel="stylesheet" href="/css/bootstrap/4.1.3/bootstrap.min.css">
    <!-- <link rel="stylesheet" type="text/css" href="//portal.cbpf.br/templates/padraogoverno01/css/template-branco.css"> -->
    <link rel="stylesheet" type="text/css" href="/css/toaster.css">
    <link rel="stylesheet" href="/css/signin.css">
    <link rel="stylesheet" type="text/css" href="/css/menu.css">    
    <link rel="stylesheet" href="/css/ngProgress.css">
    <!-- <script defer="defer" src="//barra.brasil.gov.br/barra.js" type="text/javascript"></script>    -->
    <script src="/js/jquery/3.3.1/jquery-3.3.1.slim.min.js"></script>
    <link rel="stylesheet" href="/css/plugin/3.1.5/jquery.mCustomScrollbar.min.css">
    <script src="/js/plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script> 

    <!-- <script src="/js/angularjs/1.7.3/angular.js"></script> -->
    <!-- <script src="/js/angularjs/1.7.3/angular-animate.min.js"></script>     -->
    <!-- <script src="/js/angularjs/1.7.3/angular-route.min.js"></script> -->
    <!-- <script src="/js/angularjs/uirouter/1.0.20/angular-ui-router.min.js"></script> -->
    <!-- <script src="/js/angularjs/uirouter/1.0.20/resolveService.min.js"></script> -->
    <!-- <script src="/js/angularjs/uirouter/1.0.20/stateEvents.min.js"></script> -->
    <!-- <script src="/js/ngprogress.js"></script> -->
    <!-- <script src="/js/toaster.js"></script>     -->
    
    <script src="/js/fontawesome/5.0.13/fontawesome.js"></script>
    <script src="/js/fontawesome/5.0.13/solid.js"></script>
  </head>
  <body class="bg-light" id="bodyprincipal">
        
      <div class="overlay" remove-class-menu></div>
      <!-- <iframe src="https://portal.cbpf.br/" style="width:100%; height: 235px; z-index: 30;" scrolling="no"></iframe> -->
  
    <!-- <div id="barra-brasil" style="background:#7F7F7F; height: 20px; padding:0 0 0 10px;display:block;">
        <ul id="menu-barra-temp" style="list-style:none;">
            <li style="display:inline; float:left;padding-right:10px; margin-right:10px; border-right:1px solid #EDEDED">
                <a href="//brasil.gov.br" style="font-family:sans,sans-serif; text-decoration:none; color:white;">Portal do Governo Brasileiro</a>
            </li>
            <li>
                <a style="font-family:sans,sans-serif; text-decoration:none; color:white;" href="//epwg.governoeletronico.gov.br/barra/atualize.html">Atualize sua Barra de Governo</a>
            </li>
        </ul>
    </div>
             
    <div class="layout">
        <header>
            <div class="container">
                <div class="row">
                    <div id="logo" class="col big">
                        <a href="//os.cbpf.br" title="">
                            <img src="https://portal.cbpf.br/images/imagens_menu/logo-1080.png" alt="  " />
                            <span class="portal-title-1">  </span>
                            <h1 class="portal-title corto">  </h1>
                            <span class="portal-description">  </span>
                        </a>
                    </div>
                    
                    <div class="col">
                        <div class="row">
                            <p>&nbsp;</p>
                        </div>
                        <div id="social-icons" class="row float-right">
                            <div class="col">
                            <ul class="pull-right">                                
                                <li class="portalredes-item item-138">
                                    <a href="//www.facebook.com/cbpf.mcti/" >
                                        <img src="/img/facebook-square-brands.svg" alt="Facebook" width="30px" height="30px">
                                        
                                    </a>
                                </li>
                                <li class="portalredes-item item-257">
                                    <a href="//instagram.com/cbpfoficial" >
                                        <img src="/img/instagram-brands.svg" alt="Instagram" width="30px" height="30px">
                                        
                                    </a>
                                </li>
                                <li class="portalredes-item item-136">
                                    <a href="//twitter.com/cbpf_mcti" >
                                        <img src="/img/twitter-square-brands.svg" alt="Twitter" width="30px" height="30px">
                                        
                                    </a>
                                </li>
                                <li class="portalredes-item item-137">
                                    <a href="//www.youtube.com/CBPFvideos" >
                                        <img src="/img/youtube-square-brands.svg" alt="YouTube" width="30px" height="30px">
                                       
                                    </a>
                                </li>
                            </ul>
                            </div>
                        </div>    
                    </div>
                    
                </div>
               
            </div>
            
            <div class="sobre text-right border-top">
                <div class="container">
                    <nav class="menu-servicos">
                        <ul>
                            <li class="item-131 font-weight-normal">
                                <a href="https://mail.cbpf.br/" onclick="window.open(this.href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,'); return false;">Webmail</a>
                            </li>
                            <li class="item-134 font-weight-normal">
                                <a href="http://intranet.cbpf.br/" onclick="window.open(this.href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,'); return false;">Intranet</a>
                            </li>
                            <li class="item-479 ">
                                <a href="https://postal.cbpf.br/perguntas-frequentes" class="font-weight-normal" >Perguntas Frequentes</a>
                            </li>
                            <li class="item-475 font-weight-normal">
                                <a href="https://postal.cbpf.br/area-de-imprensa" style="font-weight:normal">Área de Imprensa</a>
                            </li>
                            <li class="item-132 font-weight-normal">
                                <a href="https://postal.cbpf.br/contato" >Contato</a>
                            </li>
                        </ul>
                    </nav>    
                </div>
               
            </div>
            
                </header>  -->
    
    <main>
        <div class="container">
            <ui-view></ui-view>
        </div>
    </main>
    <!-- <footer>
        <div class="container container-menus" style="
        padding-left: 15px;">
            <div id="footer" class="row footer-menus">   
            <div class="col-auto">		
                <nav class="row assuntos nav">				 			
                    
                    <ul style="margin-left: 10px;margin-right: 10px;">
                        <li><h2>Assuntos</h2></li>
                        <li class="item-490">
                            <a href="https://portal.cbpf.br/pt-br/sobre-o-cbpf-col1">
                                Sobre o CBPF
                            </a>
                        </li>
                        <li class="item-491">
                            <a href="https://portal.cbpf.br/pt-br/missao-col1">
                                Missão
                            </a>
                        </li>
                        <li class="item-492">
                            <a href="https://portal.cbpf.br/pt-br/plano-diretor-col1">
                                Plano Diretor
                            </a>
                        </li>
                        <li class="item-493">
                            <a href="https://portal.cbpf.br/pt-br/pessoal-col1">
                                Pessoal
                            </a>
                        </li>
                        <li class="item-494">
                            <a href="https://portal.cbpf.br/pt-br/estrutura-organizacional-col1">
                                Estrutura Organizacional
                            </a>
                        </li>
                        <li class="item-495">
                            <a href="https://portal.cbpf.br/pt-br/como-chegar-col1">
                                Como Chegar
                            </a>
                        </li>
                        <li class="item-496">
                          <a href="https://portal.cbpf.br/pt-br/capacitacao-institucional-col1">
                              Capacitação Institucional
                           </a>
                        </li>
                        <li class="item-497">
                            <a href="https://portal.cbpf.br/pt-br/comissao-de-etica-col1">
                                Comissão de Ética
                           </a>
                        </li>
                        <li class="item-498">
                            <a href="https://portal.cbpf.br/pt-br/ouvidoria-da-mulher-col1">
                                Ouvidoria da Mulher
                            </a>
                        </li>
                        <li class="item-528">
                            <a href="http://portal.cbpf.br/pt-br/guia-de-boas-praticas-cientificas">
                                Guia de Boas Práticas Científicas
                            </a>
                        </li>
                        <li class="item-529">
                            <a href="http://www.grafite-ciencia.cbpf.br/">
                                Grafite da Ciência
                            </a>
                        </li>
                    </ul>
			    </nav>					
		    </div>	
		    <div class=col-auto>		
			    <nav class="row sobre nav">			
                    
                    <ul style="margin-left: 10px;margin-right: 10px;">
                        <li><h2>Sobre o site</h2></li>
                        <li class="item-172">
                            <a href="/os/acessibilidade">
                                Acessibilidade
                            </a>
                        </li>
                    </ul>
			    </nav>					
		    </div>		
		    <div class="col-auto">		
			    <nav class="row servicos nav">				 			
                    
                    <ul style="margin-left: 10px;margin-right: 10px;">
                        <li><h2>Serviços</h2></li>
                        <li class="item-131">
                            <a href="https://mail.cbpf.br/" onclick="window.open(this.href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,'); return false;">
                                Webmail
                            </a>
                        </li>
                        <li class="item-134">
                            <a href="http://intranet.cbpf.br/" onclick="window.open(this.href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,'); return false;">
                                Intranet
                            </a>
                        </li>
                        <li class="item-479">
                            <a href="http://portal.cbpf.br/pt-br/perguntas-frequentes">
                                Perguntas Frequentes
                            </a>
                        </li>
                        <li class="item-475">
                            <a href="http://portal.cbpf.br/pt-br/area-de-imprensa">
                                Área de Imprensa
                            </a>
                        </li>
                        <li class="item-132">
                            <a href="http://portal.cbpf.br/pt-br/contato">
                                Contato
                            </a>
                        </li>
                    </ul>
			    </nav>					
		    </div>		
		    <div class="col-auto">		
			    <nav class="row redes-sociais nav">				 			
                    
                    <ul style="margin-left: 10px;margin-right: 10px;">
                        <li><h2>Redes Sociais</h2></li>
                        <li class="item-138">
                            <a href="https://www.facebook.com/cbpf.mcti/">
                                Facebook
                            </a>
                        </li>
                        <li class="item-257">
                            <a href="http://instagram.com/cbpfoficial">
                                Instagram
                            </a>
                        </li>
                        <li class="item-136">
                            <a href="https://twitter.com/cbpf_mcti">
                                Twitter
                            </a>
                        </li>
                        <li class="item-137">
                            <a href="http://www.youtube.com/CBPFvideos">
                                YouTube
                            </a>
                        </li>
                    </ul>
			    </nav>					
		    </div>
	    </div>
                
    </div>
            
            <div class="footer-logos">
                <div class="container">
                                            <a href="http://www.acessoainformacao.gov.br/" tar="" target="_blanck" class="logo-acesso pull-left"><img src="https://portal.cbpf.br/templates/padraogoverno01/images/acesso-a-informacao.png" alt="Acesso a Informação"></a>
                                                              <span class="hide">&nbsp;</span>
                        <a href="http://www.brasil.gov.br/" tar="" target="_blanck" pull-right="" class="brasil float-right"><img src="https://portal.cbpf.br/templates/padraogoverno01/images/brasil.png" alt="Brasil - Governo Federal"></a>
                                    </div>
            </div>
            <div class="footer-ferramenta">
                <div class="container">
                    
                  <p align="center" style="margin-left: 10; margin-right: 10">&nbsp;</p>
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%">
   <tbody><tr>
     <td width="1">&nbsp;&nbsp;&nbsp; </td>
     <td width="98%">  


 <p align="center" style="margin:0 15; line-height:150%"><a href="https://portal.cbpf.br/pt-br/como-chegar">
 <font class="font-weight-normal" color="#000000">Rua Dr. Xavier Sigaud, 150 - Urca - Rio de Janeiro - RJ - Brasil - CEP: 22290-180</font></a> | Tel.:<a href="tel:+552121417100"><font color="#000000">+55 (21) 2141-7100</font></a> / Fax:<a href="tel:+552121417400"><font color="#000000">+55 (21) 2141-7400</font></a></p>  


 <p align="center" style="margin:0 15; line-height:150%"> <a href="/creditos-de-desenvolvimento/">Créditos de Desenvolvimento</a></p>  


     </td>
     <td width="1%">&nbsp;&nbsp;&nbsp; </td>
   </tr>
 </tbody></table>
 <p align="center" style="margin-left: 10; margin-right: 10">&nbsp;</p>
                  
                   
                  
                  
                  
                </div>
</footer> -->
            <!-- </div> -->
        <toaster-container toaster-options="{'time-out': 5000, 'body-output-type': 'trustedHtml'}"></toaster-container>
    
        <toaster-container toaster-options="{'toaster-id' : 'info-order-service', 'time-out': 10000, 'position-class': 'toast-top-full-width'}"></toaster-container>
    
    <div id="createjs">            

        <script src="/js/angularjs/1.7.3/angular.js"></script>
        <script src="/js/angularjs/1.7.3/angular-animate.min.js"></script>
        <!-- <script src="/js/angularjs/1.7.3/angular-aria.min.js"></script> -->
        <!-- <script src="/js/angularjs/1.7.3/angular-cookies.min.js"></script> -->
        <!-- <script src="/js/angularjs/1.7.3/angular-loader.min.js"></script> -->
        <!-- <script src="/js/angularjs/1.7.3/angular-message-format.min.js"></script> -->
        <!-- <script src="/js/angularjs/1.7.3/angular-messages.min.js"></script> -->
        <!-- <script src="/js/angularjs/1.7.3/angular-resource.min.js"></script> -->
        <script src="/js/angularjs/1.7.3/angular-route.min.js"></script>
        <!-- <script src="/js/angularjs/1.7.3/angular-touch.min.js"></script> -->
        <script src="/js/angularjs/uirouter/1.0.20/angular-ui-router.min.js"></script>
        <script src="/js/angularjs/uirouter/1.0.20/resolveService.min.js"></script>
        <script src="/js/angularjs/uirouter/1.0.20/stateEvents.min.js"></script>
        <script src="/js/ngprogress.js"></script>
        <script src="/js/toaster.js"></script>
        <!-- <script src="/js/md5.js"></script> -->
        <!-- <script src="/js/application/0.0.1/application.js"></script> -->
        <script src="/js/application/0.0.1/main.js"></script>
        <script src="/js/application/0.0.1/components/components.js"></script>
        <script src="/js/application/0.0.1/directives/directives.js"></script>
        <script src="/js/application/0.0.1/controllers/longin-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/dashboard-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/os-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/criaros-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/criarossolic-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/criarosdest-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/criarosdescr-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/ver-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/contato-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/sobre-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/veros-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/editeteclista-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/verosid-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/criartec-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/editetec-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/verosedit-controller.js"></script>
        <script src="/js/application/0.0.1/controllers/other-controller.js"></script>
        <script src="/js/application/0.0.1/services/coord-service.js"></script>
        <script src="/js/application/0.0.1/services/login-service.js"></script>
        <script src="/js/application/0.0.1/services/loginsession-service.js"></script>
        <script src="/js/application/0.0.1/services/logingroup-service.js"></script>
        <script src="/js/application/0.0.1/services/ordem-service.js"></script>
        <script src="/js/application/0.0.1/services/download-service.js"></script>
        <script src="/js/application/0.0.1/services/session-service.js"></script>
        <script src="/js/popper/1.14.3/popper.min.js"></script>         
        <script src="/js/popover/0.1/popclick.js"></script>
        <script src="/js/bootstrap/4.1.3/bootstrap.min.js"></script>   
    </div>
          
  </body>
</html>