<div class="clearfix bg-light"><button type="button" class="btn shadow p-2 mb-4 btn-lg float-right bg-light rounded" ng-recarregar><i class="fas fa-redo-alt"></i></button></div>
<div class="special go-botton row">
	<div class="col-sm-3">
		<input ng-model="seach.solicitante" placeholder="Solicitante">
	    <label>Solicitante</label>
	</div>
	<div class="col-sm-2">
		<select ng-model="seach.sol_coord" ng-coordsetorsolic ng-options="option.coord as option.coord for option in coorddadosSolic">
			<option value="">Selecione</option>
		</select>
		<label>Coordenação Solicitante</label>
	</div>
	<div class="col-sm-2">
		<select ng-model="seach.sol_setor" ng-options="option.setor as option.setor for option in setordadosSolic">
			<option value="">Selecione</option>
		</select>
		<label>Setor Solicitante</label>
	</div>
	<div class="col-sm-2">
		<input ng-model="seach.data_in" placeholder="Data (dia/mês/ano)">
		<label>Data de Criação (dia/mês/ano)</label>
	</div>
	<div class="col-sm-3">
		<select ng-model="seach.dest_area" ng-areatecnico ng-options="option.valor as option.valor for option in areadados">
			<option value="">Selecione</option>
		</select>
		<label>Area</label>
	</div>
</div>
<div>
	<table class="table" style="overscroll-behavior-x: contain;">
		<thead class="thead-dark">
			<tr>
				<th scope="col" class="text-center">Protocolo</th>
				<!-- <th scope="col">Editar</th> -->
				<!-- <th scope="col">Status</th>
				<th scope="col">Solicitante</th>
				<th scope="col">Email</th>
				<th scope="col">Coordenação</th>
				<th scope="col">Setor</th>
				<th scope="col">Ala</th>
				<th scope="col">Sala</th>
				<th scope="col">Ramal</th>
				 pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/([0-9]{4})"
				 placeholder="Ex: DD/MM/AAAA ou MM/AAAA ou AAAA"
			(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20|21)\d\d mes dia ano
				<th scope="col">Criação</th>
			
				<th scope="col">Modificação</th>
				
				<th scope="col">Coordenação</th>
				<th scope="col">Setor</th>
				<th scope="col">Area</th>
				<th scope="col">Descrição</th>
				<th scope="col">Status/Info</th> -->
			</tr>
		</thead>
		<tbody>
			<tr style="background-color:{{ordem.cor_os}}" ng-repeat="ordem in $ctrl.verOs | filter: {solicitante : seach.solicitante} | filter: {data_in : seach.data_in} | filter: {sol_coord : seach.sol_coord || undefined} | filter: {sol_setor : seach.sol_setor || undefined} | filter: {dest_area : seach.dest_area || undefined} | filter: {status : 'NOVA'}">
				<td class="text-center"><a views-tecnico order="ordem" ui-sref="dashboard.os.verosinfotecniconovas({ osID : ordem.id_os })" onclick="this.disabled=true;" ui-sref-active="active" class="btn btn-light">{{ordem.n_os}}</a></td>
				<!-- <td><span style="border: solid 1px black; border-radius: 5%;" class="btn">Editar</span></td> -->
				<!-- <td><span style="border: solid 1px green; border-radius: 5%; color: green; background-color: white" class="btn">{{ordem.status}}</span></td> -->
				<!-- ng-andamento="ordem.id_os"
				<td>{{ordem.solicitante}}</td>
				<td>{{ordem.sol_email}}</td>
				<td>{{ordem.sol_coord}}</td>
				<td>{{ordem.sol_setor}}</td>
				<td>{{ordem.sol_ala}}</td>
				<td>{{ordem.sol_sala}}</td>
				<td>{{ordem.sol_ramal}}</td>
				
				// Automatico para andamento da Ordem de Serviço -> ng-andamento="ordem.id_os"

				SELECT id_os, n_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` JOIN `tecnico` USING(id_os) WHERE status='ANDAMENTO' AND dest_coord='COTEC' AND dest_setor='Computação'
			
				<td>{{ordem.data_in}}</td>		
				<td ng-model="data_up" ng-change="changeDate(data_up);" ng-bing="data_time">{{ordem.data_up}}</td>
							
				<td>{{ordem.dest_coord}}</td>
				<td>{{ordem.dest_setor}}</td>
				<td>{{ordem.dest_area}}</td>
				<td>{{ordem.descr}}</td>-->
<!-- 				<td><button mensage-pop="ordem" class="btn btn-outline-info">{{ordem.status}}</button></td>
 -->			</tr>
		</tbody>
	</table>
</div>