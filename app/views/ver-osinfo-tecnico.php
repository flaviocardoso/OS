<div><button type="button" class="btn btn-lg" style="width: 50%" n--last-state>Voltar</button></div>
<div class="painel-info-os line0">
    <div class="row" style="padding-right: 0px; padding-bottom: 15px;">        
    </div>
    <div class="row box-border">
        <div class="num-info display-os col-sm">
            <h5>Número: </h5>
            <div class="num-data line1 space-right">
                <span>{{$ctrl.osid.n_os}}</span>
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
                <div class="setor-info display-os col-sm-12">
                    <div><h6 style="margin-bottom: 0px;">Setor : </h6></div><div><span class="line2 space-right">{{$ctrl.osid.sol_setor}}</span></div>
                </div>
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
                    <!-- <button ng-click="linkFile($ctrl.osid.file)">Download Arquivo</button>                     -->
                    <!--a ui-sref="dashboard.os.verosfile({ osID : $ctrl.osid.id_os })" ui-sref-active="active">Ver arquivo</a-->
                    <!--a href="http://labweb.cbpf.br/Polimorfismo.pdf" download>Download Arquivo</a-->
                </div>
            </div>
        </div>
    </div>    
</div>