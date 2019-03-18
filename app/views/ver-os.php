<?php
//ver-os.php
?>
<p><button class="btn-outline-primary" ng-click="recarregar()">Recarregar página</button> Ver Ordens de serviços</p>
<label>Any : <input ng-model="seach.$"> </label>
<label>Solicitante : <input ng-model="seach.solicitante"></label>
<label>Email solicitante : <input ng-model="seach.sol_email"></label>
<label>Coordenação solicitante : <input ng-mode="seach.sol_coord"></label>
<label>Setor solicitante : <input ng-model="seach.sol_setor"></label>
<label>Ala solicitante : <input ng-model="seach.sol_ala"></label>
<label>Sala solicitante : <input ng-model="seach.sol_sala"></label>
<label>Ramal : <input ng-model="seach.sol_ramal" placeholder="Ex: NNNN"></label>
<label>Data de criação : <input ng-model="seach.data_in" placeholder="Ex: DD/MM/AAAA"></label>
<div>
	<table class="table table-striped" style="overscroll-behavior-x: contain;">
		<thead class="thead-dark">
			<tr>
				<th scope="col">#</th>
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
				<th scope="col">Status/Info</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="ordem in $ctrl.verOs | filter:seach">
				<td><a ui-sref="dashboard.os.verosinfo({ osID : ordem.id_os })" ui-sref-active="active" class="btn btn-outline-primary">{{ordem.n_os}}</a></td>
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
				<td><button ng-click="verInfoOS(ordem.id_os);" class="btn btn-outline-info">{{ordem.status}}</button></td>
			</tr>
		</tbody>
	</table>
</div>
<ui-view></ui-view>
<!--
<div>
	<ul>
		<li ng-repeat="num in $ctrl.verOs">
			<a ui-sref="dashboard.os.ver.os.todas({ osID : num.id })" ui-sref-active="active">{{num.sNome}}</a>
		</li>
	</ul>
</div>
<ui-view></ui-view>

<script>this.innerHTML = new Date(getDateFromFormat({{ordem.data_in}} , "dd/MM/yyyy HH:mm:ss");</script>
-->
