<?php
// dashboard.php
// página que verifica a sessão
?>

<!-- colocar o nav para menu lateral por cima do contéudo com menu hamburger -->
{{ ver }}
<div class="wrapper">
    <!-- Sidebar  -->
    <nav id="sidebar" side-bar>
        <div id="dismiss" remove-class-menu>
            <i class="fas fa-arrow-left"></i>
        </div>
        <div class="sidebar-header">
            <a href="http://labweb.cbpf.br//principal.php"><h3>Ordem de Serviço</h3></a>
        </div>
        <ul class="list-unstyled components">
            <p>Menu</p>
            <li>
                <a href="" data-target="#adminSubmenu" data-toggle="collapse" class="btn-success" aria-expanded="true">Responsável</a>
                <ul class="collapse list-unstyled" id="adminSubmenu">
                    <li>
                        <a ui-sref="dashboard.os.criar" ui-sref-active="active">Criar Ordem de Serviço Para Coordenações</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.novas" ui-sref-active="active">Ver Novas Ordens de Serviço</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.emAnd" ui-sref-active="active">Ver Ordens de Serviço Andamento</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.encerr" ui-sref-active="active">Ver Ordens de Serviço Encerradas</a>
                    </li>
                    <!-- <li>
                        <a  ui-sref="dashboard.os.ver.osCoord" ui-sref-active="active">Ver Ordens de Serviço em sua Coordenação</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.ver.osSetor" ui-sref-active="active">Ver Ordens de Serviço no seu setor e na sua Coordenação</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.ver.osAdmin" ui-sref-active="active">Ver Ordens de Serviço feitas pelo Adminstração</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.teste" ui-sref-active="active">Teste</a>
                    </li> -->
                </ul>
            </li>
            <li>
                <a href="" data-target="#tecnicoSubmenu" data-toggle="collapse" class="btn-success" aria-expanded="false">Tecnico</a>
                <ul class="collapse list-unstyled" id="tecnicoSubmenu">
                    <!-- <li>
                        <a ui-sref="dashboard.os.ver.os" ui-sref-active="active">Ver Todas Ordens de Serviço</a>
                    </li> -->
                    <li>
                        <a ui-sref="dashboard.os.ver.ostecniconovas" ui-sref-active="active">Ver Novas Ordens de Serviço</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.ostecnicoandamento" ui-sref-active="active">Ver Ordens de Serviço Andamento</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.ostecnicoencerrada" ui-sref-active="active">Ver Ordens de Serviço Encerradas</a>
                    </li>
                    <!-- <li>
                        <a ui-sref="dashboard.os.ver.osCoord" ui-sref-active="active">Ver Ordens de Serviço na Coordenação</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.ver.osSetor" ui-sref-active="active">Ver Ordens de Serviço no seu Setor e na sua Coordenação</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.ver.osSolicitante" ui-sref-active="active">Ver Ordens de Serviço do Solicitadas</a>
                    </li>
                    <li>
                        <a  ui-sref="dashboard.os.ver.osTecnico" ui-sref-active="active">Ver Ordens de Serviço editada pelo Tecnico</a>
                    </li> -->
                </ul>
            </li>
        </ul>
        <ul class="list-unstyled CTAs">
            <li>
                <a ui-sref="dashboard.sobre" ui-sref-active="active" class="btn btn-success">SOBRE</a>
            </li>
            <li>
                <a ui-sref="dashboard.contato" ui-sref-active="active" class="btn btn-success">CONTANTO</a>
            </li>
        </ul>                        
    </nav>
    <nav style="padding-left: 4px; padding-right: 4px;" id="navmenu" class="navbar navbar1 navbar-expand-lg navbar-light bg-light">
        	<div style="padding-left: 0px; padding-right: 0px;" class="container-fluid">
        		<button sidebar-collapse ng-model="buttonMenu" type="button" id="sidebarCollapse" class="btn btn-info btn-lg">
            		<i class="fas fa-align-left"></i>
            		<span></span>
        		</button>
                <button ng-model="btnid" class="btn btn-lg btn-outline-success border-0 font-weight-bold text-left" disabled>
                    <span  class="nomePrefil">{{dataNome}}</span>
                </button>
        		<button class="btn btn-info dropdown-toggle1 dropdown-toggle" type="button" data-toggle="dropdown" data-target="#navbarSupportedContent" aria-haspopup="false" aria-expanded="false">
            		<i class="fas fa-ellipsis-v fa-2x"></i>
        		</button>

        		<div class="dropdown-menu dropdown-menu-right bg-light shadow p-3 mb-3 rounded" id="navbarSupportedContent">
            		<a ui-sref=".os" ui-sref-active="active" class="dropdown-item">Principal</a>
            		<a ui-sref=".sobre" ui-sref-active="active" class="dropdown-item">Sobre</a>
                    <a ui-sref=".contato" ui-sref-active="active" class="dropdown-item">Contato</a>
                    <div class="dropdown-divider"></div>
            		<button class="dropdown-item btn btn-danger" ng-click="logout()">Logout</button>            
        		</div>
    		</div>         
		</nav> 
    <!-- Page Content  -->
    <div id="content">
    <!-- impedido de usar o ng-if só permitido em caso de recarregamento de página. navbar: sticky-top, fixed-bottom, fixed-top -->
    	<!-- <nav style="padding-left: 4px; padding-right: 4px;" class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        	<div style="padding-left: 0px; padding-right: 0px;" class="container-fluid">
        		<button sidebar-collapse ng-model="buttonMenu" type="button" id="sidebarCollapse" class="btn btn-info btn-lg">
            		<i class="fas fa-align-left"></i>
            		<span></span>
        		</button>
                <button ng-model="btnid" class="btn btn-lg btn-outline-success font-weight-bold text-left" disabled>
                    <span  class="nomePrefil">{{dataNome}}</span>
                </button>
        		<button class="btn btn-info ml-auto" type="button" data-toggle="dropdown" data-target="#navbarSupportedContent" aria-expanded="false" aria-expanded="false">
            		<i class="fas fa-ellipsis-v fa-2x"></i>
        		</button>

        		<div class="dropdown-menu dropdown-menu-right bg-light shadow p-3 mb-3 rounded" id="navbarSupportedContent">
            		<a ui-sref=".os" ui-sref-active="active" class="dropdown-item">Principal</a>
            		<a ui-sref=".sobre" ui-sref-active="active" class="dropdown-item">Sobre</a>
            		<a ui-sref=".contato" ui-sref-active="active" class="dropdown-item">Contato</a>
            		<button class="dropdown-item btn btn-danger" ng-click="logout()">Logout</button>            
        		</div>
    		</div>         
		</nav>     -->
		<div class="view-animate-container">
            <ui-view></ui-view>
    		<!-- <div ui-view class="view-animate"></div> -->
		</div>
	</div>
    
</div>
<div class="overlay" remove-class-menu></div>
<!-- <script type="text/javascript">
        $(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#dismiss, .overlay').on('click', function () {
                $('#sidebar').removeClass('active');
                $('.overlay').removeClass('active');
            });

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').addClass('active');
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });

    </script> -->