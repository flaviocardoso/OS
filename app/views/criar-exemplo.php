<?php
//formulário de criação da ordem de servico
?>

<div class="form-group">
	<label for="selectCoord">Coordenação de Destinação</label>
	<select ng-model="$parent.service.Dcoord" id="selectCoord" class="form-control" required> <!-- Serviço indisponível para as outras coordenações - Coordenação COTEC - -->
		<option value="">-----</option>
		<option value="COTEC">COTEC</option>
		<option value="COEDU">COEDU</option>
		<option value="COINS">COINS</option>
		<option value="COADMIN">COADMIN</option>
		<option value="COSMO">COSMO</option>
		<option value="COTEO">COTEO</option>
		<option value="COHEP">COHEP</option>
		<option value="COMAN">COMAN</option>
	</select>
</div>



<div class="form">
	<form class="form-signin" name="serviceordem">
		<h1 class="h3 mb-3 font-weight-normal text-center">Área do Solicitante</h1>
		<label for="inputS">Nome</label>
		<input type="text" id="inputS" class="form-control" ng-model="service.nome" placeholder="Solicitante" required focus />
		<label for="inputEmail">Email</label>
		<input type="email" id="inputEmail" class="form-control" ng-model="service.email" placeholder="Email" required />
		<label for="inputC">Coordenação</label>
		<input type="text" id="inputC" class="form-control" ng-model="service.coord" placeholder="Coordenação" required />
		<label for="inputA">Ala</label>
		<input type="text" id="inputTextA" class="form-control" ng-model="service.ala" placeholder="Ala" required />
		<label for="inputTextSa">Sala</label>
		<input type="text" id="inputTextSa" class="form-control" ng-model="service.sala" placeholder="Sala" required />
		<label for="inputTel">Telefone</label>
		<input type="tel" id="inputTel" class="form-control" ng-model="service.telefone" placeholder="Telefone" required>
		<h1 class="h3 mb-3 font-weight-normal text-center">Área de Destinação</h1>
		<label for="selectCoord">Coordenação</label>
		<select ng-model="" id="selectCoord" class="form-control" required> <!-- Serviço indisponível para as outras coordenações - Coordenação COTEC - -->
			<option value="">-----</option>
			<option value="COTEC">COTEC</option>
			<option value="COEDU">COEDU</option>
			<option value="COINS">COINS</option>
			<option value="COADMIN">COADMIN</option>
			<option value="COSMO">COSMO</option>
			<option value="COTEO">COTEO</option>
			<option value="COHEP">COHEP</option>
			<option value="COMAN">COMAN</option>
		</select>
		<label for="selectSetor">Setor</label><!-- ver : Cada coordenação tem as suas áreas - Coordenação COTEC - -->
		<select ng-model="service.setor" id="selectSetor" class="form-control" required>
			<option value="">----</option>
			<option value="COMP">Computação</option>
			<option value="ELET">Eletrônica</option>
			<option value="MECA">Mecânica</option>
			<option value="SEGT">Seg. Do Trabalho</option>
		</select>
		<label for="textDesc">Descrição</label>
		<textarea ng-model="service.descr" id="textDesc" rows="5" class="form-control" required></textarea>
		<button class="btn btn-lg btn-info btn-block" type="submit" ng-click="criarOS(service)" ng-disabled="$parent.serviceordem.$invalid">Enviar</button>
	</form>
</div>

-->