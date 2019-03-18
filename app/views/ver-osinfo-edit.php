<?php
?>
<form id="edit-form" name="editserviceordem">
    <!-- <b>Solicitante : </b>
    <div class="form-group">
        <label for="inputS">Nome</label>
        <input type="text" id="inputS" class="form-control" ng-model="$ctrl.osid.solicitante" maxlength="50" onkeyup="this.value = this.value.toUpperCase();" placeholder="Solicitante" required />	
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="email" id="inputEmail" class="form-control" ng-model="$ctrl.osid.sol_email" maxlength="50" placeholder="Email" required />
    </div>
    <div class="form-group row">
        <div class="col-sm-5">
            <label for="inputC">Coordenação</label>
            <input type="text" id="inputC" class="form-control" ng-model="$ctrl.osid.sol_coord" ng-change="coordInputSolic($ctrl.osid.sol_coord)" onkeyup="this.value = this.value.toUpperCase();"  placeholder="Coordenação" required />
        </div>
        <div class="col-sm-5">
            <label for="selectC">Selecione</label>
            <select ng-model="$ctrl.osid.sol_coord" ng-change="coordInputSolic($ctrl.osid.sol_coord)" ng-click="coordInputSolic($ctrl.osid.sol_coord)" class="form-control" id="selectC" ng-options="option.coord as option.coord for option in coorddadosSolic"> -->
                <!-- <option ng-selected="!editService.sol_coord" value=""></option> -->
                <!-- <option ng-selected="$ctrl.osid.sol_coord" ng-repeat="c in coorddadosSolic" value="{{c.coord}}">{{c.coord}}</option> // coordInputSolic($parent.service.sol_coord)-->
            <!-- </select>
        </div>	
    </div> -->
    <!-- <div class="form-group row">
    	<div class="col-sm-5">
    		<label for="inputSetor">Setor</label>
    		<input type="text" id="inputSetor" class="form-control" ng-model="$ctrl.osid.sol_setor" onkeyup="this.value = this.value[0].toUpperCase() + this.value.substring(1);"  placeholder="Setor" required />
    	</div>
    	<div class="col-sm-5">
    		<label for="selectS">Selecione</label>
    		<select ng-model="$ctrl.osid.sol_setor" id="selectS" class="form-control" ng-options="option.setor as option.setor for option in setordadosSolic"> -->
    			<!-- <option value=""></option> -->
    			<!-- <option ng-repeat="s in setordadosSolic" value="{{s.setor}}" ng-selected="{{$ctrl.osid.sol_setor == s.setor}}">{{s.setor}}</option> -->
    		<!-- </select>
    	</div>
    </div> -->
    <div class="form-group">
        <label for="inputA">Ala</label>
        <input type="text" id="inputTextA" class="form-control" ng-model="$ctrl.osid.sol_ala" maxlength="10" onkeyup="this.value = this.value.toUpperCase();" placeholder="Ala" required />
    </div>
    <div class="form-group">
        <label for="inputTextSa">Sala</label>
        <input type="text" id="inputTextSa" class="form-control" ng-model="$ctrl.osid.sol_sala" maxlength="10" onkeyup="this.value = this.value.toUpperCase();" placeholder="Sala" />
    </div>
    <div class="form-group">
        <label for="inputTel">Ramal</label>
        <input type="tel" id="inputRamal" class="form-control" ng-model="$ctrl.osid.sol_ramal" maxlength="25" placeholder="Ramal" required>
    </div>    
    <b>Destinação : </b>
    <div class="form-group row">
        <div class="col-sm-5">
            <label for="inputCoord">Coordenação</label>
            <input type="text" ng-model="$ctrl.osid.dest_coord" ng-change="coordInput($ctrl.osid.dest_coord)" class="form-control" onkeyup="this.value = this.value.toUpperCase();" placeholder="Coordenação" required />
        </div>
        <div class="col-sm-5">
            <label for="selCoord">Selecione</label>
            <select ng-model="$ctrl.osid.dest_coord" ng-change="setorByCoord($ctrl.osid.dest_coord)" ng-click="setorByCoord($ctrl.osid.dest_coord)" id="selCoord" class="form-control" ng-options="option.coord as option.coord for option in coorddados">
                <!-- <option value=""></option> -->
                <!-- <option ng-repeat="c in coorddados" ng-selected="{{$ctrl.osid.dest_coord == c.coord}}" value="{{c.coord}}">{{c.coord}}</option> -->
            </select>
        </div>        
    </div>
    <div class="form-group row">
        <div class="col-sm-5">
            <label for="inputSetor">Setor</label>
            <input type="text" ng-model="$ctrl.osid.dest_setor" ng-change="setorInput($ctrl.osid.dest_setor)" class="form-control" onkeyup="this.value = this.value[0].toUpperCase() + this.value.substring(1);"  placeholder="Setor" required />
        </div>
        <div class="col-sm-5">
            <label for="selSetor">Selecione</label>
            <select ng-model="$ctrl.osid.dest_setor" ng-change="areaBySetor($ctrl.osid.dest_setor)" ng-click="areaBySetor($ctrl.osid.dest_setor)" id="selSetor" class="form-control" ng-options="option.setor as option.setor for option in setordados">
                <!-- <option value=""></option> -->
                <!-- <option ng-repeat="s in setordados" value="{{s.setor}}" ng-selected="{{$ctrl.osid.dest_setor == s.setor}}">{{s.setor}}</option> -->
            </select>
        </div>        
    </div>
    <div class="form-group row">
        <div class="col-sm-5">
            <label for="inputArea">Area</label>
            <input type="text" ng-model="$ctrl.osid.dest_area" class="form-control" onkeyup="this.value = this.value[0].toUpperCase() + this.value.substring(1);"  placeholder="Area" required />
        </div>
        <div class="col-sm-5">
            <label for="selArea">Selecione</label>
            <select ng-model="$ctrl.osid.dest_area" id="selArea" class="form-control" ng-options="option.valor as option.valor for option in areadados">
                <!-- <option value=""></option> -->
                <!-- <option ng-repeat="a in areadados" value="{{a.valor}}" ng-selected="{{$ctrl.osid.dest_area == a.valor}}">{{a.valor}}</option> -->
            </select>
        </div>        
    </div>
    <b>Descrição : </b>
    <div class="form-group">
        <label for="topicDesc">Tópico</label>
        <input type="text" id="inputTopic" class="form-control" ng-model="$ctrl.osid.descr_topic" ng-change="limitCharTopic($ctrl.osid.descr_topic)" maxlength="80" placeholder="Tópico da descrição (limite de 80 caracteres)" required/>
        <label for="textDesc">Descrição</label>
        <textarea ng-model="$ctrl.osid.descr" ng-change="limitCharDescr($ctrl.osid.descr);" id="textDesc" form="form-views" rows="5" class="form-control" placeholder="Descrição (limite de 350 caracteres)" maxlength="350" required></textarea>	
    </div>
    <div class="form-group">
        <input type="checkbox" ng-model="buttonbox"/> Trocar o arquivo
    </div>
    <div class="form-group" ng-show="buttonbox">
        <label for="inputfile">Insira um arquivo</label>
        <input type="file" file-model="$ctrl.osid.arquivo" name="arquivo" id="inputfile" class="form-control">
    </div>
    <div ng-show="files.length" class="form-group">
        <label>Arquivo :</label>
        <span>{{files[0].name}}</span>
        (
            <span ng-switch="files[0].size > 1024*1024">
                <span ng-switch-when="true">{{files[0].size / 1024 / 1024 | number:2}} MB</span>
                <span ng-switch-default>{{files[0].size / 1024 | number:2}} KB</span>
            </span>
        )
    </div>
    <div ng-show="progressVisible" class="form-group">
        
        <div class="percent">{{progress}}%</div>
        <div class="progress-bar">
            <div class="uploaded" ng-style="{'width': progress + '%'}"></div>
        </div>
    </div>
    <div class="form-group row" ng-show="buttonShow">
        <div class="col-sm-12" align="center">
            <button class="btn btn-lg btn-info btn-block" type="submit" ng-click="editarOS($ctrl.osid)">Enviar</button>	
        </div>
    </div>    
</form>