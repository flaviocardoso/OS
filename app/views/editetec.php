<div class="navbar w-100 my-1" id="painelmenu">
    <span ui-sref="dashboard.os.editeteclista" class="float-left rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
    <span ui-sref="dashboard.os" class="float-right rounded-circle"><i class="fas fa-times fa-2x"></i></span>    
</div>
<div class="card shadow border-dark m-4 my-5 p-0" id="topos">
    <div class="card-header text-center"><h4>Usuário</h4></div>                    
    <div class="card-body rounded-0 pt-0 pb-0">
        <div class="row">
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.nome">NOME</h5>{{$ctrl.tecid.nome}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom"ng-model="$ctrl.tecid.email">EMAIL</h5>{{$ctrl.tecid.email}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.coord">COORD</h5>{{$ctrl.tecid.coord}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.ala">ALA</h5>{{$ctrl.tecid.ala}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.sala">SALA</h5>{{$ctrl.tecid.sala}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.ramal">RAMAL</h5>{{$ctrl.tecid.ramal}}
            </div>
        </div>
    </div>
    <div class="card-header text-center"><h4>Grupo OS info</h4></div>                  
    <div class="card-body rounded-0 pt-0 pb-0">
        <div class="row">
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.user">USER</h5>{{$ctrl.tecid.user}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col">
                <h5 class="card-title border-bottom" ng-model="$ctrl.tecid.grupo">GRUPO</h5>
                <span ng-switch="$ctrl.tecid.grupo">
                <span ng-switch-when="admin">Adminstrador</span>
                <span ng-switch-when="secr">Secretária(o)</span>
                <span ng-switch-when="resp">Responsável</span>
                <span ng-switch-when="tec">Técnico</span>
                <span ng-switch-when="admin">Solicitante</span></span>
            </div>
            <div class="fontresize border-left-0 border-right-0 col" ngif="$ctrl.tecid.setor">
                <h5 class="card-title border-bottom">SETOR</h5>{{$ctrl.tecid.setor}}
            </div>
            <div class="fontresize border-left-0 border-right-0 col" ng-if="$ctrl.tecid.area">
                <h5 class="card-title border-bottom">AREA</h5>{{$ctrl.tecid.area}}
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="accordion text-center">
            <button class="btn btn-link btn-block" type="button" data-toggle="collapse" data-target="#collapseActions" aria-expanded="false" aria-controls="collapseActions">
                <span>CLIQUE PARA AÇÕES</span>
            </button>
        </div>
        <div class="collapse" id="collapseActions">
            <div class="row">
                <div class="col mx-auto py-2 text-center">
                    <button ng-click="copy()" class="btn btn-block" type="button" data-toggle="modal" data-target="#editaruser">EDITAR</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="painel">
    <div class="modal fade" id="editaruser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Usuário</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">                    
                    <form id="criar-form" name="editartec">
                        <div class="form-group">
                            <label for="">User</label>
                            <input type="text" name="user" ng-model="user" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="">Nome</label>
                            <input type="text" name="nome" ng-model="nome" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="">Tipo de Técnico</label>
                            <select class="form-control" ng-model="grupo">
                                <option value="admin">Adminstrador Não Confirmado</option>
                                <option value="secr">Secretária Não Confirmado</option>                
                                <option value="tec" selected>Técnico</option>
                                <option value="resp">Responsável</option>
                                <option value="sol">Solicitante</option>
                            </select>
                        </div>
                        <div class="form-group" ng-if="(grupo == 'resp') || (grupo == 'tec') || (grupo == 'admin') || (grupo == 'secr') || (grupo == 'sol') ">
                            <label for="">Coordenação</label>
                            <select class="form-control" ng-model="coord" ng-options="option.coord as option.coord for option in coorddados" ng-change="changeCoord(coord)" id="selCoord" class="form-control">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="form-group" ng-if="(coord) && (grupo == 'resp')">
                            <label for="">Setor</label>
                            <select ng-change="changeSetor(setor)" class="form-control" multiple ng-model="setor" ng-options="option.setor as option.setor for option in setordados" id="selSetor" class="form-control">
                                <option value=""></option>            
                            </select>    
                        </div>
                        <div class="form-group" ng-if="(coord) && (grupo == 'tec')">
                            <label for="">Setor</label>
                            <select class="form-control" ng-model="setor" ng-options="option.setor as option.setor for option in setordados" ng-change="changeSetor(setor)" id="selSetor" class="form-control">
                                <option value=""></option>            
                            </select>    
                        </div>
                        <div class="form-group" ng-if="(setor) && (grupo == 'tec')">
                            <label for="">Area</label>
                            <select class="form-control" change-options multiple ng-options="option.valor as option.valor for option in areadados" ng-model="area" id="selArea" class="form-control">
                                <option value=""></option>            
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Ala</label>
                            <input type="text" name="ala" ng-model="ala" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="">Sala</label>
                            <input type="text" name="sala" ng-model="sala" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="">Ramal</label>
                            <input type="text" name="ramal" ng-model="ramal" class="form-control"/>
                        </div>
                    </form>                                       
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" ng-click="editeUser({user, nome, grupo, modelcoord, modelsetor, modelarea, ala, sala, ramal})" onclick="this.disabled=true;" ng-disabled="change.$invalid">Editar</button>
                </div>
            </div>
        </div>
    </div>
</div>
{{tec}}