<?php
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

if (!isset($_SESSION)) session_start();
//$usuario = $_SESSION['user'];
//$user_email = $_SESSION['email'];
// Verifica se não há a variável da sessão que identifica o usuário
if (!isset($_SESSION['user'])) {
    // Destrói a sessão por segurança
    session_destroy();
    // Redireciona o visitante de volta pro login
    header("Location: /principal.php"); exit;
}

use lib\Conn\CN;
use lib\Modelo\Laudo;

$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);

$user_tec = $_SESSION['user'];
$tecnico = $_SESSION['user_nome'];
$tec_email = $_SESSION['user_email'];
$tec_coord = $_SESSION['user_coord'];
// $tec_setor = $_SESSION['user_setor'];
// $tec_area = $_SESSION['user_area'];
$tec_ala = $_SESSION['user_ala'];
$tec_sala = $_SESSION['user_sala'];
$tec_ramal = $_SESSION['user_ramal'];

$idos = $in['id'];
$setor = $in['setor'];
$area = $in['area'];
$laudo = $in['laudo'];
$laudo_topic = $in['topico'];
$idtecn = $in['idtec'];

$tecnico = explode(" ", $tecnico);
$tecnico = $tecnico[0] . " " . $tecnico[1];

$OSLaudo = new Laudo();
$OSLaudo->id_os = $idos;
$OSLaudo->laudo_topic = $laudo_topic;
$OSLaudo->laudo = $laudo;
$OSLaudo->id_tecnico = $idtecn;
$OSLaudo->user_tec = $user_tec;

$PDO = new CN("localhost", "cbpf_os");
$rwc_tecn = $PDO->mudarPrimeiroLaudoEmBranco($OSLaudo);

$count_tecn = $rwc_tecn['count'];

//echo $count_tecn;
// alterado aqui 14/01/2019
if ($count_tecn > 0) {
	$out['message'] = "Laudo enviado!";
} else {
	//$OSLaudo = new OSLaudoModelo();
	//$OSLaudo->id_os = $idos;
	//$OSLaudo->status_tec = 'ANDAMENTO';
	//$OSLaudo->user_tec = $user_tec;
	$OSLaudo->tecnico = $tecnico; //nome do tecnico = nome do usuário
	$OSLaudo->tec_email = $tec_email; //email do tecnico = email do usuário
	$OSLaudo->tec_coord = $tec_coord; //coordenação do tecnico = coordenação de destinação da ordem de serviço
	$OSLaudo->tec_setor = $setor; //setor de destinação da ordem de serviço
	$OSLaudo->tec_area = $area; // area de destinação da ordem de serviço
	$OSLaudo->laudo_topic = $in['topico'];
	//$OSLaudo->laudo = $in['text'];
	$OSLaudo->tec_ala = $tec_ala; //ala d0 usuário
	$OSLaudo->tec_sala = $tec_sala; //sala do usuário
	$OSLaudo->tec_ramal = $tec_ramal;//ramal do usuário
	$OSLaudo->tec_data = date('Y-m-d H:i:s');// data de alteração do tecnico

	$rwc = $PDO->postLaudoTecnico($OSLaudo);

	$count = $rwc['count'];

	if ($count > 0) {
		$out['message'] = "Laudo enviado!";
	} else {
		$out['error'] = true;
		$out['message'] = 'Laudo não enviado! Por favor aguardar.';
	}
}

echo json_encode($out);
?>
