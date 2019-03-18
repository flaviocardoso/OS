<div class="navbar w-100 my-1" id="painelmenu">
	<span ui-sref="dashboard.os" class="rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
	<span class="rounded-circle" ng-recarregar><i class="fas fa-redo fa-2x"></i></span>
</div>
<div class="presquisa text-center mb-3">	
</div>
<div>
	<table class="table" style="overscroll-behavior-x: contain;">
		<thead class="thead-dark">
			<tr>
				<th scope="col" class="text-center">USER</th>				
                <th scope="col" class="text-center">ATIVO</th>
                <th scope="col" class="text-center">GRUPO</th>
                <th scope="col" class="text-center">INFO</th>
			</tr>
		</thead>
		<tbody>
			<tr style="background-color:#7fb9c7" ng-repeat="users in $ctrl.verTecList | filter:seach">
				<td class="text-center">
					<a ui-sref="dashboard.os.editeteclista({ tecid : users.user })" ui-sref-active="active" onclick="this.disabled=true;" class="btn btn-light">{{users.user}}</a>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-light round-0" disabled>
                        <span ng-if="users.ativo == 1">SIM</span>
                        <span ng-if="users.ativo != 1">Não</span>
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-light round-0">
                        {{users.grupo}}
                    </button>
                </td>			
				<td class="text-center"><button type="button" class="btn btn-light" pop-over placement="left" trigger="focus" content="
  <b>Nome :</b> {{users.nome}}<br>  
  <b>Email :</b> {{users.email}} <hr>
  <b>Coord : </b> {{users.coord}}<br>
  <b>Setor : </b> {{users.setor}}<br>
  <b>Area : </b> {{users.area}}<br>
  <b>Ramal : </b> {{users.ramal}}<br>
  <b>Ala : </b> {{users.ala}}<br>
  <b>Sala : </b>  {{users.sala}}
  ">info</button></td>
			</tr>
		</tbody>
	</table>
</div>