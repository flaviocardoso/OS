<?php
//display erros
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

$out = array("error" => false);
$in = json_decode(file_get_contents("php://input"), true);

$id = $in['id'];
$setor = $in['setor'];
$area = $in['area'];
$resposta = $in['texto'];

$swap = explode(" ", $_SESSION['user_nome']);
$user_nome = $swap[0] . " " . $swap[1];

$OSLaudo = new Laudo();
$OSLaudo->id_os = $id;
$OSLaudo->user_tec = $_SESSION['user'];
$OSLaudo->tecnico = $user_nome; //nome do tecnico = nome do usuário
$OSLaudo->tec_email = $_SESSION['user_email']; //email do tecnico = email do usuário
$OSLaudo->tec_coord = $_SESSION['user_coord']; //coordenação do tecnico = coordenação de destinação da ordem de serviço
$OSLaudo->tec_setor = $setor; //setor de destinação da ordem de serviço
$OSLaudo->tec_area = $area; // area de destinação da ordem de serviço
$OSLaudo->grupo = $_SESSION['user_grupo'];
$OSLaudo->laudo = $resposta;
$OSLaudo->tec_ala = $_SESSION['user_ala']; //ala d0 usuário
$OSLaudo->tec_sala = $_SESSION['user_sala']; //sala do usuário
$OSLaudo->tec_ramal = $_SESSION['user_ramal'];
//ramal do usuário

$PDO = new CN("localhost", "cbpf_os");
$count = $PDO->ativarOrdem($OSLaudo);

if ($count > 0) {
    $out['message'] = "Ordem de Serviço está em Andamento!";
} else {
    $out['error'] = true;
    $out['message'] = "Erro no envio dos dados!";
}

echo json_encode($out);
?>
