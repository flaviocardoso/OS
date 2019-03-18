<div><button type="button" class="btn btn-lg" style="width: 50%"  ng-last-state>Voltar</button></div>
<div class="painel-info-os line0">
    <div class="row box-border">
        <div class="num-info display-os col-sm">
            <h5>Número: </h5>
            <div class="num-data line1 space-right">
                <span>{{$ctrl.osid.n_os}}</span>
            </div>
        </div>
                <div class="num-info display-os col-sm">
            <h5>Status: </h5>
            <div class="line1 space-right">
                <span>{{$ctrl.osid.status}}</span>
            </div>
        </div>
    </div>
    <div class="row box-border">
        <div class="display-os col-sm">
            <h5>Setor: </h5>
            <div class="line1 space-right">
                <span>{{$ctrl.osid.dest_setor}}</span>
            </div>
        </div>
        <div class="display-os col-sm">
            <h5>Area: </h5>
            <div class="line1 space-right">
                <span>{{$ctrl.osid.dest_area}}</span>
            </div>
        </div>
    </div>
    <div class="row box-border">    
        <div class="criacao-info display-os col-sm-6">
            <h5>Criação: </h5>
            <div class="date-hora-data">
                <span class="line1 space-right">{{$ctrl.osid.data_in}}</span>
            </div>            
        </div>
        <div class="modificacao-info display-os col-sm-6">
            <h5>Modicação: </h5>
            <div class="date-hora-data">
                <span class="line1 space-right">{{$ctrl.osid.data_up}}</span>
            </div>
        </div>
    </div>    
    <div class="row">
        <div class="sol-info col-sm-6 box-border">
            <h5>Solicitante: </h5>
            <div class="row">
                
                <div class="nome-info col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Nome : </h6></div><div class="line-normal"><span>{{$ctrl.osid.solicitante}}</span></div>
                </div>
                <div class="email-info col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Email : </h6></div><div class="line-normal"><span>{{$ctrl.osid.sol_email}}</span></div>
                </div>
                <div class="ramal-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Ramal : </h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_ramal}}</span></div>
                </div>
                <div class="cood-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Coordenação :</h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_coord}}</span></div>
                </div>
                <!-- <div class="setor-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Setor : </h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_setor}}</span></div>
                </div> -->
                <div class="ala-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Ala : </h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_ala}}</span></div>
                </div>
                <div class="sala-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Sala : </h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_sala}}</span></div>
                </div>
            
            </div>            
        </div>
        <div class="descr-info col-sm-6 box-border line-normal">
            <h5>Descrição : </h5>
            <div class="row mx-auto">
                <div class="topic-descr col-sm-12 no-padding">
                    <span><b>{{$ctrl.osid.descr_topic}}</b></span>
                </div>
                <div class="descr-dado box-border col-sm-12 no-padding">
                    <span>{{$ctrl.osid.descr}}</span>
                </div>
                <div class="arquivo-dado col-sm-12 no-padding form-group">
                    <button file-download="$ctrl.osid.file" ng-bind="$ctrl.osid.file"></button>
                    <!--button ng-click="linkFile($ctrl.osid.file)">Download Arquivo</button-->                    
                    <!--a ui-sref="dashboard.os.verosfile({ osID : $ctrl.osid.id_os })" ui-sref-active="active">Ver arquivo</a-->
                    <!--a href="http://labweb.cbpf.br/Polimorfismo.pdf" download>Download Arquivo</a-->
                </div>
            </div>
        </div>
    </div>    
</div>
<div class="painel-mudar">
    <div>
        <input type="checkbox" ng-model="alteraros" id="alterar-os">
        <label for="alterar-os">Renovar Ordem de Serviço</label>
        <button ng-show="alteraros" type="type" class="btn" data-toggle="modal" data-target="#renovarorderservice">Renovar</button>
    </div>
    <!-- modal -->
    <div class="modal fade" id="renovarorderservice" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Renovar Ordem de Serviço</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="terminar">
                        <div class="form-group">
                            <label for="idJust">Justificativa</label>
                            <textarea ng-model="just" id="idJust" class="form-control" aria-describedby="justHelp" required></textarea>
                            <small id="justHelp" class="form-text text-muted">Escreva uma justificativa para a Renovação desta Ordem de Serviço.</small>
                        </div>                        
                    </form>                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" laudo-renova-ordem idos="$ctrl.osid.id_os" resposta="just" ng-disabled="terminar.$invalid">Renovar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="painel-tecnico" last-laudo ng-model="$ctrl.osid.id_os">
    <div ng-repeat="l in laudos track by $index"> <!-- ng-repeat para demais laudos feitos pela atual ordem de serviços em andamento {{$ctrl.os_id}} o id abre os laudos escritos na ordem de serviço-->
        <hr>
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
        </div>
    </div>
</div>

<!-- <button type="button" class="btn btn-info popoverclick" data-placement="left" data-trigger="focus" title="Informação" data-toggle="popover" data-html="true" data-content="
            <b>Email: </b> {{l.tec_email}}<br>
            <b>Coordenação: </b> {{l.tec_coord}}<br>
            <b>Ramal:</b> {{l.tec_ramal}}<br>">Info</button> -->