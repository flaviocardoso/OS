<?php
//solic.php
// puxar dados dos usuários para está página para um carregamento automatico dos campos
?>
<div class="form-group">
	<label for="inputS">Nome</label>
	<input type="text" id="inputS" class="form-control" ng-model="$parent.service.sol" maxlength="50" onkeyup="this.value = this.value.toUpperCase();" placeholder="Solicitante" required />	
</div>
<div class="form-group">
	<label for="inputEmail">Email</label>
	<input type="email" id="inputEmail" class="form-control" ng-model="$parent.service.sol_email" maxlength="50" placeholder="Email" required />
</div>
<div class="form-group row">
	<div class="col-sm-5">
		<label for="inputC">Coordenação</label>
		<input type="text" id="inputC" class="form-control" ng-model="$parent.service.sol_coord" value="" ng-blur="coordInput($parent.service.sol_coord)" onkeyup="this.value = this.value.toUpperCase();"  placeholder="Coordenação" required />
	</div>
	<div class="col-sm-5">
		<label for="selectC">Selecione</label>
		<select ng-model="$parent.service.sol_coord" ng-change="setorByCoord($parent.service.sol_coord)" class="form-control" id="selectC">
			<option value=""></option>
			<option ng-repeat="c in coorddados" value="{{c.coord}}">{{c.coord}}</option>
		</select>		
	</div>	
</div>
<div class="form-group">
	<label for="inputA">Ala</label>
	<input type="text" id="inputTextA" class="form-control" ng-model="$parent.service.sol_ala" maxlength="10" onkeyup="this.value = this.value.toUpperCase();" placeholder="Ala" required />
</div>
<div class="form-group">
	<label for="inputTextSa">Sala</label>
	<input type="text" id="inputTextSa" class="form-control" ng-model="$parent.service.sol_sala" maxlength="10" onkeyup="this.value = this.value.toUpperCase();" placeholder="Sala" />
</div>
<div class="form-group">
	<label for="inputTel">Ramal</label>
	<input type="tel" id="inputRamal" class="form-control" ng-model="$parent.service.sol_ramal" maxlength="25" placeholder="Ramal" required>
</div>
<div class="form-group row">
	<div class="col-sm-2">
	</div>
	<div class="col-sm-8 text-center"></div>
	<div class="col-sm-2 text-right">
		<a ui-sref=".dest" class="btn btn-info" ng-disabled="$parent.serviceordem.$invalid">
			Próximo <i class="fas fa-arrow-right"></i>
		</a>
	</div>
</div>
