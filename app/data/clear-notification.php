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

$out = array("error" => false);
$in = json_decode(file_get_contents("php://input"), true);

$PDO = new CN("localhost", "cbpf_os");
$count = $PDO->tirarNotifica($in['id']);

if ($count > 0) {
    $out['message'] = "Ordem de Serviço Ativada!";
} else {
    $out['error'] = true;
    $out['message'] = "Ordem de Serviço não Ativada!";
}

echo json_encode($out);
?>
