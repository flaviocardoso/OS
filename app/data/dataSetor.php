<?php //dataSetor.php
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

$coord = json_decode(file_get_contents("php://input"), true);

$coord_ = "";

if ($coord["coord"] == "") {
	$coord_ = $_SESSION["user_coord"];
} else {
	$coord_ = $coord["coord"];
}

$PDO = new CN( "localhost", "cbpf_estrutura");
$rwc = $PDO->dataSetorByCoord($coord_);
$rows = $rwc['rows'];
$count = $rwc['count'];

echo json_encode($rows);
?>