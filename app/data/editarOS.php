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
use lib\Modelo\OS;

$solicitante = explode(" ", $in['solicitante']);
$solicitante = $solicitante[0] . " " . $solicitante[1];

$OS = new OS();
$OS->id_os = $in['id_os'];
$OS->solicitante = $solicitante;
$OS->sol_email = $in['sol_email'];
$OS->sol_coord = $in['sol_coord'];
$OS->sol_setor = $in['sol_setor'];
$OS->sol_ala = $in['sol_ala'];
$OS->sol_sala = $in['sol_sala'];
$OS->sol_ramal = $in['sol_ramal'];
$OS->dest_coord = $in['dest_coord'];
$OS->dest_setor = $in['dest_setor'];
$OS->dest_area = $in['dest_area'];
$OS->file = $in['file'];
$OS->descr_topic = $in['descr_topic'];
$OS->descr = $in['descr'];

$PDO = new CN( "localhost", "cbpf_os");
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