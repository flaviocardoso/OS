<div class="navbar w-100 my-1" id="painelmenu">
    <span ui-sref="dashboard.os.ver.recebidaversecrnova" class="float-left rounded-circle"><i class="fas fa-angle-left fa-3x"></i></span>
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

    </div>

</div>
<div class="painel-mudar">

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
