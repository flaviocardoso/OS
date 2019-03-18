<?php
//desc.php
?>
<div class="form-group">
	<label for="selCoord">Coordenação</label>
	<select ng-model="$parent.service.dest_coord" ng-change="setorByCoord($parent.service.dest_coord)" id="selCoord" class="form-control">
		<option value=""></option>
		<option ng-repeat="c in coorddados" value="{{c.coord}}">{{c.coord}}</option>
	</select>
</div>
<div class="form-group" ng-show="showSetor">
	<label for="selSetor">Setor</label>
	<select ng-model="$parent.service.dest_setor" ng-change="areaBySetor($parent.service.dest_setor)" id="selSetor" class="form-control">
		<option value=""></option>
		<option ng-repeat="s in setordados" value="{{s.setor}}">{{s.setor}}</option>
	</select>
</div>
<div class="form-group" ng-show="showArea">
	<label for="selArea">Area</label>
	<select ng-model="$parent.service.dest_area" id="selArea" class="form-control">
		<option value=""></option>
		<option ng-repeat="a in areadados" value="{{a.valor}}">{{a.valor}}</option>
	</select>
</div>

<div class="row">
	<div class="col text-left">
		<a ui-sref="dashboard.os.criar.solic" class="btn btn-info">
			<i class="fas fa-arrow-left"></i> Anterior
		</a>
	</div>
	<div class="col text-right">
		<a ui-sref=".descr" class="btn btn-info" ng-disabled="$parent.serviceordem.$invalid">
			Próximo <i class="fas fa-arrow-right"></i>
		</a>
	</div>
</div>
<!--<div>
	Tem {{coorddados.length}} coordenações.
	<ul>
		<li class="animate-repeat" ng-repeat="coord in coorddados">{{coord.coord}}</li>
	</ul>
	<select ng-model="$parent.service.Dcoord" ng-click="setorById($parent.service.Dcoord)">
		<option value=""></option>
		<option ng-repeat="c in coorddados" value="{{c.id_coord}}">{{c.coord}}</option>
	</select>
	
	<select ng-show="showSetor" ng-model="$parent.service.Dsetor" ng-click="areaById($parent.service.Dsetor)">
		<option value=""></option>
		<option ng-repeat="s in setordados" value="{{s.id_setor}}">{{s.setor}}</option>
	</select>
	
	<select ng-show="showArea" ng-model="$parent.service.Darea">
		<option value=""></option>
		<option ng-repeat="a in areadados" value="{{a.id_area}}">{{a.area}}</option>
	</select>
	
	
	Tem {{sertordados.lenght}} setores.
	<ul>
		<li class="animate-repeat" ng-repeat="setor in sertordados">{{setor.setor}}</li>
	</ul>
	
</div>
-->