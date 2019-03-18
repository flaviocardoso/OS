<?php
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

//$path_root = $_SERVER["DOCUMENT_ROOT"];
//$path_files  = "/anexos/";

//echo "ok";

// solicitante=:solicitante, sol_email=:sol_email, sol_coord=:sol_coord, sol_setor=:sol_setor, sol_ala=:sol_ala, sol_sala=:sol_sala, sol_ramal=:sol_ramal, data_up=:data_up, dest_coord=:dest_coord, dest_setor=:dest_setor, dest_area=:dest_area, file=:file, descr_topic=:descr_topic, descr=:descr 
$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);

include("CN.php");
$host = "localhost";
$dbname = "cbpf_os";

$solicitante = explode(" ", $in['solicitante']);
$solicitante = $solicitante[0] . " " . $solicitante[1];

// modificar aqui para receber o user e o email (o email vai receber as notificações 24/01/2019
/*
$sol_user = $in['user']; // user para carragamento de dados do usuário
$sol_email_noticication = $in['email']; // email de destinação das notificações da ordem de serviço criada
$dest_coord = $in['dest_coord'];
$dest_setor = $in['dest_setor'];
$dest_area = $in['dest_area'];
$file = $in['arq'];
$topico = $in['descr_topic'];
$descr = $in['descr'];
$criador = $_SESSION['user']; // user de adminstador criador da ordem de serviço
$criador_email = $_SESSION['user_email']; // email de adminstrador criador da ordem de serviço
*/

$PDO = new CN();
$PDO->connect($host, $dbname);
include("OSModelo.php");
$OS = new OSClass();
$OS->id_os = $in['id_os'];
// -- info inicio
$OS->solicitante = $solicitante;
$OS->sol_email = $in['sol_email'];
$OS->sol_coord = $in['sol_coord'];
$OS->sol_setor = $in['sol_setor'];
$OS->sol_ala = $in['sol_ala'];
$OS->sol_sala = $in['sol_sala'];
$OS->sol_ramal = $in['sol_ramal'];
// -- info fim
//$OS->data_up = date('Y-$in['data_up'];
$OS->dest_coord = $in['dest_coord'];
$OS->dest_setor = $in['dest_setor'];
$OS->dest_area = $in['dest_area'];
$OS->file = $in['file'];
$OS->descr_topic = $in['descr_topic'];
$OS->descr = $in['descr'];

$wc = $PDO->editarOS($OS);

$count = $wc['count'];

if ($count > 0) {
	$out['message'] = "Ordem de serviço editada";
}
else {
	$out['error'] = true;
	$out['message'] = "Ordem de serviço não editada";
}

echo json_encode($out);

?>