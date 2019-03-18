<?php
//criar.php
?>
<div id="form-container">
	<div class="page-header text-center">
		<h3>Criar Ordem de Serviço</h3>
		<div id="status-buttons" class="text-center">
			<a ui-sref=".solic" ui-sref-active="active"><span>1</span> Solicitante</a>
			<a ui-sref=".dest" ui-sref-active="active" ng-disabled="serviceordem.$invalid"><span>2</span> Destinação</a>
			<a ui-sref=".descr" ui-sref-active="active" ng-disabled="serviceordem.$invalid"><span>3</span> Descrição</a>
		</div>
	</div>
	<form id="criar-form" name="serviceordem">
		<ui-view id="form-views" ></ui-view>
	</form>	
</div>
