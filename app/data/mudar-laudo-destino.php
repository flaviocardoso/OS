<?php
//display erros

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

$out = array("error" => false);
$in = json_decode(file_get_contents("php://input"), true);

$id = $in['id'];
$setor = $in['setor'];
$area = $in['area'];
$changesetor = $in['changesetor'];
$changearea = $in['changearea'];
$motivo = $in['motivo'];

$user_tec = $_SESSION['user'];
$tecnico = $_SESSION['user_nome'];
$tec_email = $_SESSION['user_email'];
$tec_coord = $_SESSION['user_coord'];
$tec_setor = $_SESSION['user_setor'];
$tec_area = $_SESSION['user_area'];
$tec_ala = $_SESSION['user_ala'];
$tec_sala = $_SESSION['user_sala'];
$tec_ramal = $_SESSION['user_ramal'];

$topico = "Ordem de Serviço transferida!";
$laudo = $motivo . " De -> " . $tec_coord . " | " . $setor . " | " . $area . ". Para -> " . $tec_coord . " | " . $changesetor . " | " . $changearea;
//"Ordem de Serviço: da coordenação " . $tec_coord . ", setor " . $tec_setor . ", area " . $tec_area . "; para coordenação " . $tec_coord . ", setor " . $setor . ", area " . $area;

$tecnico = explode(" ", $tecnico);
$tecnico = $tecnico[0] . " " . $tecnico[1];

$OSLaudo = new Laudo();
$OSLaudo->id_os = $id;
$OSLaudo->user_tec = $user_tec;
$OSLaudo->tecnico = $tecnico; //nome do tecnico = nome do usuário
$OSLaudo->tec_email = $tec_email; //email do tecnico = email do usuário
$OSLaudo->tec_coord = $tec_coord; //coordenação do tecnico = coordenação de destinação da ordem de serviço
$OSLaudo->tec_setor = $setor; //setor de destinação da ordem de serviço
$OSLaudo->tec_area = $area; // area de destinação da ordem de serviço
$OSLaudo->laudo_topic = $topico;
$OSLaudo->laudo = $laudo;
$OSLaudo->tec_ala = $tec_ala; //ala d0 usuário
$OSLaudo->tec_sala = $tec_sala; //sala do usuário
$OSLaudo->tec_ramal = $tec_ramal;//ramal do usuário

$PDO = new CN( "localhost", "cbpf_os");
$count = $PDO->mudarOrdemDestino($OSLaudo, $changesetor, $changearea);

if ($count > 0) {
    $out['message'] = "Ordem de Serviço Modificada!";
} else {
    $out['error'] = true;
    $out['message'] = "Ordem de Serviço não Modificada!";
}

echo json_encode($out);

?>