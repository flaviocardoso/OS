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

$out = array("error" => false);
$in = json_decode(file_get_contents("php://input"), true);

$id_os = $in['id'];
$n_os = $in['n'];

session_start();
$user_views = $_SESSION['user'];
$nome_views = $_SESSION['user_nome'];
$coord_views = $_SESSION['user_coord'];
$setor_views = $_SESSION['user_setor'];
$area_views = $_SESSION['user_area'];

$nome = explode(" ", $nome_views);
$nome_views = $nome[0] . " " . $nome[1];

include("CN.php");
$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN();
$PDO->connect($host, $dbname);

include("OSModelo.php");
$OS = new OSClass();
$OS->id_os = $id_os;
$OS->n_os = $n_os;
$OS->user_views = $user_views;
$OS->nome_views = $nome_views;
$OS->coord_views = $coord_views;
$OS->setor_views = $setor_views;
$OS->area_views = $area_views;

$data = $PDO->registroViews($OS);

if ($data > 0) {
	$out['message'] = "Novo Visita.";
} else {
	$out['error'] = true;
    $out['message'] = 'Visita não guardada.';
}

echo json_encode($out);
?>
