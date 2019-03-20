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
            <p>Setecrataria(o)</p>
            <li>
                <a ui-sref="dashboard.os.criaros" ui-sref-active="active">Criar OS</a>
            </li>
            <li>
                <a href="" data-target="#AdminOS" data-toggle="collapse" class="btn btn-success" aria-expanded="false">Ordem Serviço</a>
                <ul class="collapse list-unstyled components" id="AdminOS">
                    <a href="" data-target="#AdminEnviada" data-toggle="collapse" class="btn btn-success" aria-expanded="false">Enviadas</a>
                    <ul class="collapse list-unstyled components" id="AdminEnviada">
                        <li>
                            <a ui-sref="dashboard.os.ver.enviadavernova" ui-sref-active="active">Nova</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.enviadaverandamento" ui-sref-active="active">Andamento</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.enviadaverespera" ui-sref-active="active">Espera</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.enviadaverencerrada" ui-sref-active="active">Encerrada</a>
                        </li>
                    </ul>
                    <!-- modificar para o modo secretaria -->
                    <a href="" data-target="#AdminRecebida" data-toggle="collapse" class="btn btn-success" aria-expanded="false">Recebidas</a>
                    <ul class="collapse list-unstyled components" id="AdminRecebida">
                        <li>
                            <a ui-sref="dashboard.os.ver.recebidavernova" ui-sref-active="active">Nova</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.recebidaverandamento" ui-sref-active="active">Andamento</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.recebidaverespera" ui-sref-active="active">Espera</a>
                        </li>
                        <li>
                            <a ui-sref="dashboard.os.ver.recebidaverencerrada" ui-sref-active="active">Encerrada</a>
                        </li>
                    </ul>
                </ul>
            </li>
            <p>Solicitante</p>
            <li>
                <a href="" data-target="#AdminOSSolicitante" data-toggle="collapse" class="btn btn-success" aria-expanded="false">Acompanhar</a>
                <ul class="collapse list-unstyled components" id="AdminOSSolicitante">
                    <li>
                        <a ui-sref="dashboard.os.ver.solicvernova" ui-sref-active="active">Nova</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.solicverandamento" ui-sref-active="active">Andamento</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.solicverespera" ui-sref-active="active">Espera</a>
                    </li>
                    <li>
                        <a ui-sref="dashboard.os.ver.solicverencerrada" ui-sref-active="active">Encerrada</a>
                    </li>
                </ul>
            </li>
        </ul>
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
