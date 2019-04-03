<div class="navbar w-100 my-1" id="painelmenu">
	<span ui-sref="dashboard.os" class="rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
	<span class="rounded-circle" ng-recarregar><i class="fas fa-redo fa-2x"></i></span>
</div>
<div class="pesquisa text-center my-2">
	<button class="btn btn-secundary" type="button" data-toggle="collapse" data-target="#collapsePesquisa" aria-expanded="false">
		<span class="font-weight-bold">Pesquisa</span>
	</button>
	<div class="collapse" id="collapsePesquisa">
		<div class="card card-body">
			<div class="special go-botton text-center mb-1">
				<div class="col-sm">
					<input ng-model="seach.solicitante" placeholder="Solicitante">
					<label>Solicitante</label>
				</div>
			</div>
			<div class="special go-botton mb-1">
				<div class="col-sm">
					<input ng-model="seach.tecnico" placeholder="tecnico">
					<label>Tecnico</label>
				</div>
			</div>
			<div class="special go-botton mb-1">
				<div class="col-sm">
					<input ng-model="seach.data_in" placeholder="Data (dia/mês/ano)">
					<label>Data de Criação</label>
				</div>
			</div>
			<div class="special go-botton mb-1">
				<div class="col-sm">
					<input ng-model="seach.data_up" placeholder="Data (dia/mês/ano)">
					<label>Data de Modificação</label>
				</div>
			</div>
			<div class="special go-botton mb-1">
					<div class="col-sm">
						<select ng-model="seach.dest_coord" ng-coord-admin ng-options="option.coord as option.coord for option in coorddados">
							<option value="">Selecione</option>
						</select>
						<label>Setor</label>
					</div>
				</div>
			<div class="special go-botton mb-1">
				<div class="col-sm">
					<select ng-model="seach.dest_setor" ng-setor-admin ng-options="option.setor as option.setor for option in setordados">
						<option value="">Selecione</option>
					</select>
					<label>Setor</label>
				</div>
			</div>
			<div class="special go-botton mb-1">
				<div class="col-sm text-center">
					<select ng-model="seach.dest_area" ng-area-admin ng-options="option.valor as option.valor for option in areadados">
						<option value="">Selecione</option>
					</select>
					<label>Area</label>
				</div>
			</div>			
		</div>
	</div>
	<!-- <button class="btn btn-secundary dropdown-toggle" type="button" data-target="#pesquisa" data-toggle="modal" aria-haspopup="true">
		<h3 class="text-uppercase font-weight-bold">PESQUISA</h3>
	</button> -->
</div>
<div>
	<table class="table" style="overscroll-behavior-x: contain;">
		<thead class="thead-dark">
			<tr>
				<th scope="col" class="text-center">protocolo</th>				
				<th scope="col" class="text-center">Status/Info</th>
			</tr>
		</thead>
		<tbody>
			<tr style="background-color:{{ordem.cor_os}}" ng-repeat="ordem in $ctrl.verOs | filter: { solicitante : seach.solicitante} | filter: {data_in : seach.data_in} | filter: {data_up : seach.data_up} | filter: {dest_coord : seach.dest_coord || undefined} | filter: {dest_setor : seach.dest_setor || undefined} | filter: {dest_area : seach.dest_area || undefined} | filter:  {tecnico : seach.tecnico} | filter: {status : 'NOVA'}">
				<td class="text-center">
					<a ui-sref="dashboard.os.infoenviadavernovaadmin({ osID : ordem.id_os })" ui-sref-active="active" onclick="this.disabled=true;" class="btn btn-light">{{ordem.n_os}}</a>
				</td>				
				<td class="text-center"><button type="button" class="btn btn-light" pop-over placement="left" trigger="focus" content="
  <b>Número :</b> {{ordem.n_os}}<br><hr>  
  <b>Criação :</b>  
{{ordem.data_in}} <hr>
  <b>Modicação : </b>  
{{ordem.data_up}} <hr>
  <b>Solicitante info : </b><br>
  <b>Nome: </b> {{ordem.solicitante}}<br>
  <b>Email: </b> {{ordem.sol_email}}<br>
  <b>Ramal: </b> <td>{{ordem.sol_ramal}}</td> <br>
  <b>Topico de Descrição : </b>  {{ordem.descr_topic}}
  "><span ng-if="ordem.M > 0" class="badge badge-warning">{{ordem.M}}</span> {{ordem.status}}</button></td>
			</tr>
		</tbody>
	</table>
</div>