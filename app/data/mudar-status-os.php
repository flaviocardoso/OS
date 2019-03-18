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

$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);

$id = $in['id'];
$setor = $in['setor'];
$area = $in['area'];
$data = date('Y-m-d H:i:s');

$user_tec = $_SESSION['user'];
$tecnico = $_SESSION['user_nome'];
$tec_email = $_SESSION['user_email'];
$coord = $_SESSION['user_coord'];
// $tec_setor = $_SESSION['user_setor'];
// $tec_area = $_SESSION['user_area'];
$tec_ala = $_SESSION['user_ala'];
$tec_sala = $_SESSION['user_sala'];
$tec_ramal = $_SESSION['user_ramal'];

$tecnico = explode(" ", $tecnico);
$tecnico = $tecnico[0] . " " . $tecnico[1];

$OSLaudo = new Laudo();
$OSLaudo->id_os = $id; // id da ordem de serviço
//$OSLaudo->status_tec = $status; // mudança da ordem de serviço
$OSLaudo->user_tec = $user_tec; // nomde usuário da ordem de serviço
$OSLaudo->tecnico = $tecnico; //nome do tecnico = nome do usuário
$OSLaudo->tec_email = $tec_email; //email do tecnico = email do usuário
$OSLaudo->tec_coord = $coord; //coordenação do tecnico = coordenação de destinação da ordem de serviço
$OSLaudo->tec_setor = $setor; //setor de destinação da ordem de serviço
$OSLaudo->tec_area = $area; // area de destinação da ordem de serviço
$OSLaudo->grupo = $_SESSION['user_grupo'];
$OSLaudo->laudo_topic = "Iniciando Ordem de Serviço";
$OSLaudo->laudo = "O {$tecnico} está iniciando a Ordem de Serviço.";
$OSLaudo->tec_ala = $tec_ala; //ala d0 usuário
$OSLaudo->tec_sala = $tec_sala; //sala do usuário
$OSLaudo->tec_ramal = $tec_ramal;//ramal do usuário
//$OSLaudo->tec_data = $data;// data de alteração do tecnico

$PDO = new CN("localhost", "cbpf_os");
$rwc = $PDO->postLaudoTecnico($OSLaudo);
$count = $rwc['count'];

if ($count > 0) {
    $out['message'] = "Laudo criado. Pronto para critério técnico.";
} else {
    $out['error'] = true;
    $out['message'] = 'Laudo não criado! Por favor aguardar.';
}

echo json_encode($out);
?>