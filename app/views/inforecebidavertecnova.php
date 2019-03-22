<div class="navbar w-100 my-1" id="painelmenu">
    <span ui-sref="dashboard.os.ver.recebidavernova" class="float-left rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
    <span class="float-none rounded-circle" ng-recarregar><i class="fas fa-redo fa-2x"></i></span>
    <span ui-sref="dashboard.os" class="float-right rounded-circle"><i class="fas fa-times fa-2x"></i></span>    
</div>
<div class="card shadow border-dark m-4 my-5 p-0" id="topos">
    <div class="card-header text-center"><h4>ORDEM DE SERVIÇO</h4></div>
    <div class="card-body pt-0 pr-0 pl-0">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">PROTOCOLO</th>
                    <th scope="col">STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"><span class="fontresize">{{$ctrl.osid.n_os}}</span></th>
                    <th scope="row"><span class="fontresize">{{$ctrl.osid.status}}</span></th>
                </tr>
            </tbody>
        </table>               
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">SETOR</th>
                    <th scope="col">AREA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"><span class="fontresize">{{$ctrl.osid.dest_setor}}</span></th>
                    <th scope="row"><span class="fontresize">{{$ctrl.osid.dest_area}}</span></th>
                </tr>
        </table>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">CRIAÇÃO</th>
                    <th scope="col">MODICAÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">
                        <div class="row">
                            <div class="col fontresize"><i class="fa fa-calendar-alt"></i> <span>{{$ctrl.osid.data_in}}</span> </div>
                            <div class="col fontresize"><i class="fa fa-clock"></i> <span>{{$ctrl.osid.hora_in}}</span></div>
                        </div>                
                    </th>
                    <th scope="row">
                        <div class="row">
                            <div class="col fontresize"><i class="fa fa-calendar-alt"></i> <span>{{$ctrl.osid.data_up}}</span> </div>
                            <div class="col fontresize"><i class="fa fa-clock"></i> <span>{{$ctrl.osid.hora_up}}</span> </div>
                        </div>
                    </th>
                </tr>
        </table>      
        <div class="card">
            <div class="card-header text-center">
                SOLICITANTE                    
            </div>                
            <div class="card-body rounded-0 pt-0 pb-0">
                <div class="row">
                    <div class="fontresize border-left-0 border-right-0 col">
                       <h5 class="card-title border-bottom">NOME</h5>{{$ctrl.osid.solicitante}}
                    </div>
                    <div class="fontresize border-left-0 border-right-0 col">
                        <h5 class="card-title border-bottom">EMAIL</h5>{{$ctrl.osid.sol_email}}
                    </div>
                    <div class="fontresize border-left-0 border-right-0 col">
                        <h5 class="card-title border-bottom">COORD</h5>{{$ctrl.osid.sol_coord}}
                    </div>
                    <div class="fontresize border-left-0 border-right-0 col">
                        <h5 class="card-title border-bottom">ALA</h5>{{$ctrl.osid.sol_ala}}
                    </div>
                    <div class="fontresize border-left-0 border-right-0 col">
                        <h5 class="card-title border-bottom">SALA</h5>{{$ctrl.osid.sol_sala}}
                    </div>
                </div>
            </div>                
        </div>
        <div class="card">
            <div class="card-header text-center">
                DESCRIÇÃO
            </div>
            <div class="card-body">
                <h4 class="card-title">{{$ctrl.osid.descr_topic}}</h4>
                <p class="card-text ">{{$ctrl.osid.descr}}</p>

            </div>
            <div class="card-footer">
                <div id="anexofile">
                    Anexo: 
                    <span ng-show="$ctrl.osid.file">
                        <span file-download="$ctrl.osid.file" class="btn btn-link"> CLIQUE PARA DOWNLOAD</span>
                    </span>
                    <span ng-hide="$ctrl.osid.file">
                        SEM ANEXO
                    </span>
                </div>
                <div id="downloados">
                    Ordem de Servico: 
                    <span class="btn btn-link"> GERAR AQUIVO</span>                    
                </div>
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
                    <button laudo-select-coord class="btn btn-block" type="button" data-toggle="modal" data-target="#trocarorderservice">TRANSFERIR</button>
                </div>
                <div class="w-100"></div>
                <div class="col mx-auto text-center">
                    <button type="button" class="btn btn-block" data-toggle="modal" data-target="#andamentoordem">INICIAR</button>
                </div>
            </div>
        </div>
    </div>
    
</div>
<div class="painel-mudar">    
    <div class="modal fade" id="trocarorderservice" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Transferir Ordem de Serviço</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="change">
                        <div class="form-group">
                            <label for="idSetor">Setor</label>
                            <select laudo-select-setor ng-model="laudosetor" id="idSetor" class="form-control" ng-options="option.setor as option.setor for option in setordados" required>
                                <option value="">Selecione Setor</option>
                            </select>
                            <small id="setorHelp" class="form-text text-muted">Selecione um setor de destino para a transferência</small>
                        </div>
                        <div class="form-group">
                            <label for="idArea">Area</label>
                            <select ng-model="laudoarea" id="idArea" class="form-control" ng-options="option.valor as option.valor for option in areadados" required>
                                <option value="">Selecione Area</option>
                            </select>
                            <small id="areaHelp" class="form-text text-muted">Selecione uma area de destino para a transferência</small>
                        </div>
                        <div class="form-group">                            
                            <textarea ng-model="motivotrans" class="form-control"></textarea>
                            <small class="form-text text-muted">Movito para transferência</small>
                        </div>
                        <div class="form-group">
                            <small id="trocaHelp" class="form-text text-muted">Confirme</small>
                            <input type="checkbox" ng-model="trocaOrdem" id="idTrocar" required>
                            <label for="idTrocar">SIM</label>
                        </div>                       
                    </form>                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" laudo-change setor="$ctrl.osid.dest_setor" area="$ctrl.osid.dest_area" changearea="laudoarea" changesetor="laudosetor" idos="$ctrl.osid.id_os" motivo="motivotrans" confcheck="trocaOrdem" onclick="this.disabled=true;" ng-disabled="change.$invalid">Trocar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal andamento ordem de serviço -->
    <div class="modal fade" id="andamentoordem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Andamento Ordem de Serviço</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="runorderservice">                        
                        <div class="form-group">
                            <small id="trocaHelp" class="form-text text-muted">Confirme</small>
                            <input type="checkbox" ng-model="runOrdem" id="idRun" required>
                            <label for="idRun">SIM</label>
                        </div>                       
                    </form>                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" ng-andamento idos="$ctrl.osid.id_os" setor="$ctrl.osid.dest_setor" area="$ctrl.osid.dest_area" confcheck="runOrdem" onclick="this.disabled=true;" ng-disabled="runorderservice.$invalid">Andamento</button>
                </div>
            </div>
        </div>
    </div>
</div> 
<div class="painel-tecnico pr-4 pl-4" last-laudo ng-model="$ctrl.osid.id_os">
    <div id="laudo">
        <h4 class="text-center">LAUDOS</h4>
    </div>
    <div ng-repeat="l in laudos track by $index"> <!-- ng-repeat para demais laudos feitos pela atual ordem de serviços em andamento {{$ctrl.os_id}} o id abre os laudos escritos na ordem de serviço-->
        <div class="card shadow-sm border-secondary" style="margin-top: 0.2em;">
            <div class="card-header" pop-over placement="bottom" trigger="focus hover" content="
            <b>Email: </b> {{l.tec_email}}<br>
            <b>Ramal:</b> {{l.tec_ramal}}<br>">
                <div class="row">
                    <div class="col">
                        <span style="font-size:.6rem" ng-if="l.M == 'S'" class="bagge badge-pill badge-primary align-middle"></span>
                        <span style="font-size: 1rem; padding-bottom: 2px" class="badge badge-light text-capitalize align-bottom">{{l.tecnico}}</span>
                        <span style="font-size: 1rem"><li class="badge badge-pill badge-info align-middle">{{l.grupo}}</li></span> 
                    </div>                   
                </div>
                <div class="row">
                    <div class="col">
                        <span><i class="fa fa-calendar-alt"></i><span style="font-size: 1rem" class="badge badge-light">{{l.data}}</span></span>
                        <span><i class="fa fa-clock"></i><span style="font-size: 1rem" class="badge badge-light">{{l.hora}}</span></span>
                    </div>                    
                </div>                        
            </div>
            <div class="card-body text-secondary">
                <h5 class="card-title"><span>{{l.laudo_topic}}</span></h5>
                <p class="card-text"><span>{{l.laudo}}</span></p>
            </div>
            <div class="card-footer">
                <span class="badge badge-pill badge-info"><li>{{l.tec_coord}}</li></span>
                <span class="badge badge-pill badge-info"><li>{{l.tec_setor}}</li></span>
                <span class="badge badge-pill badge-info"><li>{{l.tec_area}}</li></span>
            </div>
        </div>
    </div>
</div>
<div class="fixed-bottom" id="bottonangleup"><div class="clearfix"><div class="float-right pr-3 pb-3"><span anchor-scroll><i class="fas fa-angle-up fa-3x"></i></span></div></div></div>