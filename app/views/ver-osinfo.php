<?php
//ver-osinfo.php
?>

<!--
<div>Nº : {{$ctrl.osid.n_os}}</div>
<div>Nome : {{$ctrl.osid.solicitante}}</div>
<div>Email : {{$ctrl.osid.sol_email}}</div>
<div>Telefone : {{$ctrl.osid.sol_ramal}}</div>
<div>Coordenação : {{$ctrl.osid.sol_coord}}</div>
<div>Ala : {{$ctrl.osid.sol_ala}}</div>
<div>Sala : {{$ctrl.osid.sol_sala}}</div>
-->

<div class="painel-info-os line0">
    <div class="row" style="padding-right: 0px; padding-bottom: 15px;">
        <div  class="line-normal col text-right">
            <a ui-sref="dashboard.os.verosedit({ osID : $ctrl.osid.id_os })" ui-sref-active="active" class="btn btn-primary">Edite</a>
        </div>
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
                    <button ng-click="linkFile($ctrl.osid.file)">Download Arquivo</button>                    
                    <!--a ui-sref="dashboard.os.verosfile({ osID : $ctrl.osid.id_os })" ui-sref-active="active">Ver arquivo</a-->
                    <!--a href="http://labweb.cbpf.br/Polimorfismo.pdf" download>Download Arquivo</a-->
                </div>
            </div>
        </div>
    </div>    
</div>
<!--
html = html + "Nº : " + ordem.n_os;
            html = html + "<br><b>Criação : &nbsp;</b>"
            html = html + "<span><b>Data: </b> " + day_create + "/" + month_create + "/" + year_create;
            html = html + "</span><span>&nbsp;&nbsp;&nbsp;  <b>Hora: </b> " + hour_create + ":" + minute_create + ":" + zero_create + secund_create;
            html = html + "</span><br><b>Modicação : &nbsp;</b>";
            html = html + "<span><b>Data: </b> " + day_modification + "/" + month_modification + "/" + year_modification;
            html = html + "</span><span>&nbsp;&nbsp;&nbsp; <b>Hora: </b> " + hour_modification + ":" + minute_modification + ":" + zero_modification + secund_modification;
            html = html + "</span><br><b>Solicitante info : &nbsp;</b>";
            html = html + "<span><b>Nome:</b> " + ordem.solicitante + "</span>";
            html = html + "<span>&nbsp;&nbsp;&nbsp;&nbsp; <b>Email:</b> " + ordem.sol_email + "</span>";
            html = html + "<span>&nbsp;&nbsp;&nbsp;&nbsp; <b>Ramal:</b> " + ordem.sol_ramal + "</span>";
            html = html + "<br><b>Topico de Descrição : &nbsp;</b>";
            html = html + "<span>" + ordem.descr_topic + "</span>";
            html = html + "<br><b>Tecnico info : &nbsp;</b>";
            html = html + "<span><b>Nome:</b> " + "</span>";
            html = html + "<span>&nbsp;&nbsp;&nbsp;&nbsp; <b>Email:</b> " + "</span>";
            html = html + "<span>&nbsp;&nbsp;&nbsp;&nbsp; <b>Ramal:</b> " + "</span>";                
            html = html + "<br><b>Topico de Laudo : &nbsp;</b>";
            html = html + "<span>Pequena descrição do laudo para ordem de serviço.</span>";
            -->
