<div class="navbar w-100 my-1" id="painelmenu">
	<span ui-sref="dashboard.os" class="rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
	<span class="rounded-circle" ng-recarregar><i class="fas fa-redo fa-2x"></i></span>
</div>
<div class="presquisa text-center mb-3">
	<button class="btn btn-secundary dropdown-toggle" type="button" data-target="#pesquisa" data-toggle="modal" aria-haspopup="true">
		<h3 class="text-uppercase font-weight-bold">PESQUISA</h3>
	</button>
</div>
<!-- MODAL -->
<div class="modal fade" id="pesquisa" tabindex="-1" role="dialog" aria-labelledby="pesquisaLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			
			<div class="modal-header">
				<!-- <h4 class="modal-title text-uppercase text-center" id="pesquisaLabel">PESQUISA</h4> -->
				<button type="button" class="close" data-dismiss="modal" aria-label="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			<div class="modal-body">
				<div class="special go-botton row mb-2">
					<div class="col mb-3">
						<input ng-model="seach.solicitante" placeholder="Solicitante">
					    <label>Solicitante</label>
					</div>
					<div class="w-100"></div>
					<div class="col mb-3">
						<input ng-model="seach.tecnico" placeholder="tecnico">
						<label>Tecnico</label>
					</div>
					<div class="w-100"></div>
					<div class="col mb-3">
						<select ng-model="seach.dest_area" ng-areatecnico ng-options="option.valor as option.valor for option in areadados">
							<option value="">Selecione</option>
						</select>
						<label>Area</label>
					</div>
					<div class="w-100"></div>
					<div class="col">
						<input ng-model="seach.data_up" placeholder="Data (dia/mês/ano)">
						<label>Data de Modificação</label>
					</div>
				</div>
			</div>
			<!--
			<div class="modal-footer">
				<button type="button" class="btn btn-secundary" data-dismiss="modal">Pesquisa</button>
			</div>
			-->
		</div>
	</div>
	<!--
	<div class="dropdown-menu w-100" aria-labelledby="dropdownPesquisa">
		<div class="special go-botton row mb-2">
			<div class="col-sm-3 mb-3 w-100 mx-auto">
				<input ng-model="seach.solicitante" placeholder="Solicitante">
			    <label>Solicitante</label>
			</div>
			<div class="w-100"></div>
			<div class="col-sm-3 mb-3 w-100 mx-auto">
				<input ng-model="seach.tecnico" placeholder="tecnico">
				<label>Tecnico</label>
			</div>
			<div class="w-100"></div>
			<div class="col-sm-2 mb-3 w-100 mx-auto">
				<select ng-model="seach.dest_area" ng-areatecnico ng-options="option.valor as option.valor for option in areadados">
					<option value="">Selecione</option>
				</select>
				<label>Area</label>
			</div>
			<div class="w-100"></div>
			<div class="col-sm-2 mb-3 w-100 mx-auto">
				<input ng-model="seach.data_up" placeholder="Data (dia/mês/ano)">
				<label>Data de Modificação</label>
			</div>
		</div>
	</div>
-->
</div>
<!--
<div class="special go-botton row mb-3">
	<div class="col-sm-3">
		<input ng-model="seach.solicitante" placeholder="Solicitante">
	    <label>Solicitante</label>
	</div>
	<div class="col-sm-3">
		<select ng-model="seach.sol_coord" ng-coordsetorsolic ng-options="option.coord as option.coord for option in coorddadosSolic">
			<option value="">Selecione Coordenação</option>
		</select>
		<label>Coordenação Solicitante</label>
	</div>
	<div class="col-sm-3">
		<select ng-model="seach.sol_setor" ng-options="option.setor as option.setor for option in setordadosSolic">
			<option value="">Selecione Setor</option>
		</select>
		<label>Setor Solicitante</label>
	</div>
	<div class="col-sm-3">
		<input ng-model="seach.data_in" placeholder="Data (dia/mês/ano)">
		<label>Data de Criação</label>
	</div>
</div>
<div class="special go-botton row mb-3">
	<div class="col-sm-3">
		<input ng-model="seach.tecnico" placeholder="tecnico">
		<label>Tecnico</label>
	</div>
	<div class="col-sm-2">
		<select ng-model="seach.dest_area" ng-areatecnico ng-options="option.valor as option.valor for option in areadados">
			<option value="">Selecione</option>
		</select>
		<label>Area</label>
	</div>
	<div class="col-sm-2">
		<input ng-model="seach.data_up" placeholder="Data (dia/mês/ano)">
		<label>Data de Modificação</label>
	</div>
</div>

-->
<div>
	<table class="table" style="overscroll-behavior-x: contain;">
		<thead class="thead-dark">
			<tr>
				<th scope="col" class="text-center">protocolo</th>
				<!-- <th scope="col">Editar</th> -->
				<!-- <th scope="col">Status</th>
				<th scope="col">Solicitante</th>
				<th scope="col">Email</th>
				<th scope="col">Coordenação</th>
				<th scope="col">Setor</th>
				<th scope="col">Ala</th>
				<th scope="col">Sala</th>
				<th scope="col">Ramal</th>
			(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20|21)\d\d mes dia ano
				<th scope="col">Criação</th>
			
				<th scope="col">Modificação</th>
				
				<th scope="col">Coordenação</th>
				<th scope="col">Setor</th>
				<th scope="col">Area</th>
				<th scope="col">Descrição</th>-->
				<th scope="col" class="text-center">Status/Info</th>
			</tr>
		</thead>
		<tbody>
			<tr style="background-color:{{ordem.cor_os}}" ng-repeat="ordem in $ctrl.verOs | filter: { solicitante : seach.solicitante} | filter: {data_in : seach.data_in} | filter: {data_up : seach.data_up} | filter: {sol_coord : seach.sol_coord || undefined} | filter: {sol_setor : seach.sol_setor || undefined} | filter: {dest_area : seach.dest_area || undefined} | filter:  {tecnico : seach.tecnico} | filter: {status : 'ANDAMENTO'}">
				<td class="text-center">
					<a ui-sref="dashboard.os.verosinfotecnicoandamento({ osID : ordem.id_os })" ui-sref-active="active" onclick="this.disabled=true;" class="btn btn-light">{{ordem.n_os}}</a>
				</td>
				<!-- <td><span style="border: solid 1px black; border-radius: 5%;" class="btn">Editar</span></td> -->
				<!-- <td><span style="border: solid 1px green; border-radius: 5%; color: green; background-color: white" class="btn">{{ordem.status}}</span></td> -->
				<!--
				<td>{{ordem.solicitante}}</td>
				<td>{{ordem.sol_email}}</td>
				<td>{{ordem.sol_coord}}</td>
				<td>{{ordem.sol_setor}}</td>
				<td>{{ordem.sol_ala}}</td>
				<td>{{ordem.sol_sala}}</td>
				<td>{{ordem.sol_ramal}}</td>
			
				<td>{{ordem.data_in}}</td>		
				<td ng-model="data_up" ng-change="changeDate(data_up);" ng-bing="data_time">{{ordem.data_up}}</td>
							
				<td>{{ordem.dest_coord}}</td>
				<td>{{ordem.dest_setor}}</td>
				<td>{{ordem.dest_area}}</td>
				<td>{{ordem.descr}}</td>-->
				<!-- <td>
					<button type="button" data-toggle="modal" data-target="#modal{{ordem.id_os}}" class="btn btn-outline-info">{{ordem.status}}</button>
					<div modal ordem="ordem" id="ordem.id_os"></div>
				</td> -->
				<td class="text-center">
					<button type="button" class="btn btn-light" pop-over placement="left" trigger="focus" content="
  <b>Número :</b> {{ordem.n_os}}<br><hr>  
  <b>Criação :</b>  
{{ordem.data_in}} <hr>
  <b>Modicação : </b>  
{{ordem.data_up}} <hr>
  <b>Solicitante info : </b><br>
  <b>Nome: </b> {{ordem.solicitante}}<br>
  <b>Email: </b> {{ordem.sol_email}}<br>
  <b>Ramal: </b> <td>{{ordem.sol_ramal}}</td> <br>
  <b>Topico de Descrição : </b>  {{ordem.descr_topic}}<hr>  
  <b>Tecnico info : </b><br>
  <b>Nome: </b> {{ordem.tecnico}} <br>
  <b>Email: </b> {{ordem.tec_email}}<br>
  <b>Ramal:</b> {{ordem.tec_ramal}}<br>
  <b>Topico de Laudo :</b> {{ordem.laudo_topic}}<br>
  ">{{ordem.status}}</button>
				</td>				
			</tr>
		</tbody>
	</table>
</div>

<script type="text/javascript">
    $(function () {
      $('[data-toggle="popover"]').popover();
      $('.popover-dismiss').popover({
		  trigger: 'focus'
		})
    })
</script>