<?php
//desc.php
?>
<div class="form-group">
	<label for="topicDesc">Tópico</label>
	<input type="text" id="inputTopic" class="form-control" ng-model="$parent.service.descr_topic" ng-change="limitCharTopic($parent.service.descr_topic)" maxlength="80" placeholder="Tópico da descrição (limite de 80 caracteres)" required/>
	<label for="textDesc">Descrição</label>
	<textarea ng-model="$parent.service.descr" ng-change="limitCharDescr($parent.service.descr)" id="textDesc" form="form-views" rows="5" class="form-control" placeholder="Descrição (limite de 350 caracteres)" maxlength="350" required></textarea>	
</div>
<div class="form-group">
	<label for="inputfile">Insira um arquivo</label>
	<input type="file" name="arquivo" id="inputfile" class="form-control">
</div>
<div ng-show="$parent.files.length" class="form-group">
	<label>Arquivo :</label>
	<span>{{$parent.files[0].name}}</span>
	(
		<span ng-show="$parent.files[0].size > 1024*1024">{{$parent.files[0].size / 1024 / 1024 | number:2}} MB</span>
		<span ng-hide="$parent.files[0].size > 1024*1024">{{$parent.files[0].size / 1024 | number:2}} KB</span>
	)
</div>
<div ng-show="$parent.progressVisible" class="form-group">
	
	<div class="percent">{{$parent.progress}}%</div>
	<div class="progress-bar">
		<div class="uploaded" ng-style="{'width': $parent.progress + '%'}"></div>
	</div>
</div>
<div class="form-group row" ng-show="$parent.buttonShow">
	<div class="col-sm-12" align="center">
		<button class="btn btn-lg btn-info btn-block" type="submit" ng-click="$parent.criarOS($parent)">Enviar</button>	
	</div>
</div>
<div class="form-group row">
	<div class="col-sm-2">
		<a ui-sref=".dest" class="btn btn-info">
			<i class="fas fa-arrow-left"></i> Anterior	
		</a>		
	<div class="col-sm-8 text-center"></div>
	<div class="col-sm-2 text-right">		
	</div>
</div>