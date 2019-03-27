<div class="navbar w-100 my-1" id="painelmenu">
	<span ui-sref="dashboard.os" class="rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
	<span class="rounded-circle" ng-recarregar><i class="fas fa-redo fa-2x"></i></span>
</div>
<div class="presquisa text-center mb-3">
	<button class="btn btn-secundary dropdown-toggle" type="button" data-target="#pesquisa" data-toggle="modal" aria-haspopup="true">
		<h3 class="text-uppercase font-weight-bold">PESQUISA</h3>
	</button>
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
			<tr style="background-color:{{ordem.cor_os}}" ng-repeat="ordem in $ctrl.verOs | filter:seach | filter: {status : 'NOVA'}">
				<td class="text-center">
					<a ui-sref="dashboard.os.infoeditadalaudotecnova({ osID : ordem.id_os })" ui-sref-active="active" onclick="this.disabled=true;" class="btn btn-light">{{ordem.n_os}}</a>
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
