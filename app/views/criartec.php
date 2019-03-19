<?php
?>
<div id="form-container">
    <form id="criar-form" name="criartec">
        <div class="form-group">
            <label for="">User</label>
            <input ng-model="tec.user" class="form-control" type="text" required>
        </div>
        <div class="form-group">
            <label for="">Nome</label>
            <input ng-model="tec.nome" class="form-control" type="text" required>
        </div>
        <div class="form-group">
            <label for="">Tipo de Técnico</label>
            <select class="form-control" ng-model="tec.grupo">
                <option value="admin">Adminstrador Não Confirmado</option>
                <option value="secr">Secretária Não Confirmado</option>                
                <option value="tec" selected>Técnico</option>
                <option value="resp">Responsável</option>
                <option value="sol">Solicitante</option>
            </select>
        </div>
        <div class="form-group" ng-if="(tec.grupo == 'resp') || (tec.grupo == 'tec') || (tec.grupo == 'admin') || (tec.grupo == 'secr') || (tec.grupo == 'sol') ">
            <label for="">Coordenação</label>
            <select ng-change="changeCoord(tec.coord)" class="form-control" ng-model="tec.coord" ng-options="option.coord as option.coord for option in coorddados" ng-change="setorByCoord(tec.dest_coord)" id="selCoord" class="form-control">
                <option value=""></option>
            </select>
        </div>
        <div class="form-group" ng-if="(tec.coord) && (tec.grupo == 'resp')">
            <label for="">Setor</label>
            <select ng-change="changeSetor(tec.setor)" class="form-control" multiple ng-model="tec.setor" ng-options="option.setor as option.setor for option in setordados" ng-change="areaBySetor(tec.dest_setor)" id="selSetor" class="form-control">
                <option value=""></option>            
            </select>    
        </div>
        <div class="form-group" ng-if="(tec.coord) && (tec.grupo == 'tec')">
            <label for="">Setor</label>
            <select class="form-control" ng-change="changeSetor(tec.setor)" ng-model="tec.setor" ng-options="option.setor as option.setor for option in setordados" ng-change="areaBySetor(tec.dest_setor)" id="selSetor" class="form-control">
                <option value=""></option>            
            </select>    
        </div>
        <div class="form-group" ng-if="(tec.setor) && (tec.grupo == 'tec')">
            <label for="">Area</label>
            <select class="form-control" change-options multiple ng-options="option.valor as option.valor for option in areadados" ng-model="tec.area" id="selArea" class="form-control">
                <option value=""></option>            
            </select>
        </div>
        <div class="form-group">
            <label for="">Ala</label>
            <input ng-model="tec.ala" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="">Sala</label>
            <input ng-model="tec.sala" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="">Ramal</label>
            <input ng-model="tec.ramal" class="form-control"/>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-lg btn-info btn-block" ng-click="criarUser(tec)" ng-disabled="tec.$invalid" onclick="this.disabled=true;">Enviar</button>
        </div>
    </form>
</div>
{{tec}}
