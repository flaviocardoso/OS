<?php
$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);

$id = $in['id'];
//$status = "ENCERRADA";
//$data = date('Y-m-d H:i:s');

session_start();
$user_tec = $_SESSION['user'];
$tecnico = $_SESSION['user_nome'];
$tec_email = $_SESSION['user_email'];
$tec_coord = $_SESSION['user_coord'];
$tec_setor = $_SESSION['user_setor'];
$tec_area = $_SESSION['user_area'];
$tec_ala = $_SESSION['user_ala'];
$tec_sala = $_SESSION['user_sala'];
$tec_ramal = $_SESSION['user_ramal'];

$topico = "Ordem de Serviço Encerrada!";
$laudo = "Ordem de Serviço Encerrada! De -> " . $tec_coord . " | " . $tec_setor . " | " . $tec_area . ".";

include("CN.php");
$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN();
$PDO->connect($host, $dbname);

$tecnico = explode(" ", $tecnico);
$tecnico = $tecnico[0] . " " . $tecnico[1];

include("OSLaudoModelo.php");

$OSLaudo = new OSLaudoModelo();
$OSLaudo->id_os = $id;
//$OS->status = $status;
//$OS->data_up = $data;
$OSLaudo->user_tec = $user_tec;
$OSLaudo->tecnico = $tecnico; //nome do tecnico = nome do usuário
$OSLaudo->tec_email = $tec_email; //email do tecnico = email do usuário
$OSLaudo->tec_coord = $tec_coord; //coordenação do tecnico = coordenação de destinação da ordem de serviço
$OSLaudo->tec_setor = $tec_setor; //setor de destinação da ordem de serviço
$OSLaudo->tec_area = $tec_area; // area de destinação da ordem de serviço
$OSLaudo->laudo_topic = $topico;
$OSLaudo->laudo = $laudo;
$OSLaudo->tec_ala = $tec_ala; //ala d0 usuário
$OSLaudo->tec_sala = $tec_sala; //sala do usuário
$OSLaudo->tec_ramal = $tec_ramal;//ramal do usuário

$count = $PDO->encerraOrdem($OSLaudo);

if ($count > 0) {
	$out['message'] = "Ordem Servicço Encerrada!";
} else {
	$out['error'] = true;
	$out['message'] = "Ordem de Serviço Não Encerrada!";
}

echo json_encode($out);
?>
