<div class="navbar w-100 my-1" id="painelmenu">
    <span ui-sref="dashboard.os.ver.ostecnicoandamento" class="float-left rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
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
                    <button laudo-select class="btn btn-block" type="button" data-toggle="modal" data-target="#trocarorderservice">TRANSFERIR ORDEM DE SERVIÇO</button>
                </div>
                <div class="w-100"></div>
                <div class="col mx-auto text-center">
                    <button class="btn btn-block" type="button" data-toggle="modal" data-target="#encerrarorderservice">ENCERRAR ORDEM DE SERVIÇO</button>
                </div>
                <div class="w-100"></div>
                <div class="col mx-auto py-2 text-center">
                    <button class="btn btn-block" type="button" data-toggle="modal" data-target="#enviarlaudoorderservice">INICIAR LAUDO</button>
                </div>
            </div>
        </div>
    </div>
    
</div>
<div class="painel-mudar">
    <!-- <div>
        <input type="checkbox" ng-model="alteraros" id="alterar-os"/>
        <label for="alterar-os">Alterar Ordem de Serviço</label>
    </div> -->
    <!-- <div ng-show="alteraros"> --> <!-- implementar encerramento de ordem de serviço e mudança de setor e area --> 
        <!-- <div>
            <input type="checkbox" id="mudar-destino" ng-model="mudarsetorarea" />
            <label for="mudar-destino">Transferir Ordem de Serviço</label>
            <button class="btn" type="button" ng-show="mudarsetorarea" data-toggle="modal" data-target="#trocarorderservice">Transferir</button>
        </div>     
        <div>
            <input type="checkbox" id="change-status" name="change" ng-model="mudarstatusencerrada" />
            <label for="change-status">Encerrar Ordem de Serviço</label>
            <button class="btn" type="button" ng-show="mudarstatusencerrada" data-toggle="modal" data-target="#encerrarorderservice">Encerrar</button>
        </div> 
        <div>
            <input type="checkbox" id="enviar-laudo" name="change" ng-model="enviarlaudoordem" />
            <label for="enviar-laudo">Iniciar laudo</label>
            <button class="btn" type="button" ng-show="enviarlaudoordem" data-toggle="modal" data-target="#enviarlaudoorderservice">Laudo</button>
        </div> -->            
        <!-- <div class="sub-painel-mudar" ng-show="mudarsetorarea">
            <select ng-model="laudosetor" laudo-select ng-options="option.setor as option.setor for option in setordados">
                <option value="">Selecione Setor</option>
            </select>
            <select ng-model="laudoarea" ng-options="option.valor as option.valor for option in areadados">
                <option value="">Selecione Area</option>
            </select>
            <button laudo-change changesetor="laudosetor" changearea="laudoarea" idlaudoos="$ctrl.osid.id_os" class="btn">Trocar</button>
        </div> -->
    <!-- </div> -->
    <!-- Modal trocar -->
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
                            <select ng-model="laudosetor" id="idSetor" class="form-control" laudo-select ng-options="option.setor as option.setor for option in setordados" required>
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
                            <textarea ng-model="movitotrans" class="form-control"></textarea>
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
                    <button type="button" class="btn btn-primary" laudo-change changearea="laudoarea" changesetor="laudosetor" idlaudoos="$ctrl.osid.id_os" laudomotivo="movitotrans" onclick="this.disabled=true;" ng-disabled="change.$invalid">Trocar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal encerrar -->
    <div class="modal fade" id="encerrarorderservice" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Encerrar Ordem de Serviço</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="finish" novalidate>
                        <div class="form-group">
                            <label>Você quer encerrar está Ordem de Serviço?</label>
                            <small id="encerrarHelp" class="form-text text-muted">Marque a caixa abaixo se você realmente quer encerrar esta Ordem de Serviço!</small>
                            <input type="checkbox" value="" id="checkEncerra" ng-model="encerraOrdem" required >
                            <label for="checkEncerra">SIM</label>
                            <!-- <textarea ng-model="just" id="idJust" class="form-control" aria-describedby="justHelp" required></textarea>
                            <small id="justHelp" class="form-text text-muted">Escreva uma justificativa para a Renovação desta Ordem de Serviço.</small> -->
                        </div>                        
                    </form>                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">NÂO</button>
                    <button type="button" class="btn btn-primary" laudo-encerra confcheck="mudarstatusencerrada" idlaudoos="$ctrl.osid.id_os" onclick="this.disabled=true;" ng-disabled="finish.$invalid">Encerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Enviar laudo -->
    <div class="modal fade" id="enviarlaudoorderservice" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Laudo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="laudoenvio">
                        <div class="form-group">
                            <div>                                
                                <input type="text" ng-model="laudotopictecnico" class="form-control" required/>
                                <small class="form-text text-muted">Breve laudo para Ordem de Serviço. Por exemplo: Um palavra e duas, ou frase.</small>
                                <textarea ng-model="laudotecnico" class="form-control" required ></textarea>
                                <small class="form-text text-muted">Laudo para Ordem de Serviço.</small>
                                <!-- <button class="btn" ng-laudotecnico text="laudotecnico" topic="laudotopictecnico" idos="$ctrl.osid.id_os" idtec="$ctrl.osid.id_tecnico">Enviar laudo</button> -->
                            </div>
                            <!-- <textarea ng-model="just" id="idJust" class="form-control" aria-describedby="justHelp" required></textarea>
                            <small id="justHelp" class="form-text text-muted">Escreva uma justificativa para a Renovação desta Ordem de Serviço.</small> -->
                        </div>                        
                    </form>                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" ng-laudotecnico text="laudotecnico" topic="laudotopictecnico" idos="$ctrl.osid.id_os" idtec="$ctrl.osid.id_tecnico" onclick="this.disabled=true;" ng-disabled="laudoenvio.$invalid">Enviar</button>
                </div>
            </div>
        </div>
    </div>
</div> 
<!-- <div class="painel-laudo-os">
    <div>
        <label>Laudo : </label>
        <input type="text" ng-model="laudotopictecnico" placeholder="Tópico de laudo de Serviço" />
        <textarea ng-model="laudotecnico" ></textarea>
        <button class="btn" ng-laudotecnico text="laudotecnico" topic="laudotopictecnico" idos="$ctrl.osid.id_os" idtec="$ctrl.osid.id_tecnico">Enviar laudo</button>
    </div>
</div> -->
<div class="painel-tecnico pr-4 pl-4" last-laudo ng-model="$ctrl.osid.id_os">
    <div id="laudo">
        <h4 class="text-center">LAUDOS</h4>
    </div>
    <div ng-repeat="l in laudos track by $index"> <!-- ng-repeat para demais laudos feitos pela atual ordem de serviços em andamento {{$ctrl.os_id}} o id abre os laudos escritos na ordem de serviço-->
        <div class="card shadow-sm border-secondary" style="margin-top: 0.2em;">
            <div class="card-header" pop-over placement="bottom" trigger="click" content="
            <b>Email: </b> {{l.tec_email}}<br>
            <b>Coordenação: </b> {{l.tec_coord}}<br>
            <b>Ramal:</b> {{l.tec_ramal}}<br>">
            <span>{{l.tecnico}}</span>            
            </div>
            <div class="card-body text-secondary">
                <h5 class="card-title"><span>{{l.laudo_topic}}</span></h5>
                <p class="card-text"><span>{{l.laudo}}</span></p>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col text-center"><i class="fa fa-calendar-alt"></i> {{l.data}}</div>
                    <div class="col text-center"><i class="fa fa-clock"></i> {{l.hora}}</span></div>
                </div>
            </div>
        </div>
        <!-- <hr>
        <div class="last-laudo" style="border-radius: 1px; box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.3);">
            <div style="padding-top: 1em; margin-left: 1.2em; ">
                <span class="tecnico-nome"><button type="button" style="padding: 0 0 0 0;" class="btn btn-info" pop-over placement="bottom" trigger="focus" content="
            <b>Email: </b> {{l.tec_email}}<br>
            <b>Coordenação: </b> {{l.tec_coord}}<br>
            <b>Ramal:</b> {{l.tec_ramal}}<br>">{{l.tecnico}}</button></span>
            <span class="tecnico-data"><button type="button" style="padding: 0 0 0 0;" class="btn btn-light" disabled>{{l.tec_data}}</button>
                </span>
            </div>            
            <div class="laudo-descr">
                <hr>
                <div>
                    <div style="margin-left: 1.2em; margin-right: 1.2em"><b>{{l.laudo_topic}}</b></div>
                </div>
                <hr>              
                <div>
                    <div style="margin-left: 1.2em; margin-right: 1.2em">{{l.laudo}}</div>
                </div>
                <hr>           
            </div>
        </div> -->
    </div>
</div>
<div class="fixed-bottom" id="bottonangleup"><div class="clearfix"><div class="float-right pr-3 pb-3"><span anchor-scroll><i class="fas fa-angle-up fa-3x"></i></span></div></div></div>