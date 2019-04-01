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
use lib\Modelo\Views;

$out = array("error" => false);
$in = json_decode(file_get_contents("php://input"), true);

$id_os = $in['id'];
$n_os = $in['num'];
$user_views = $_SESSION['user'];
$nome_views = $_SESSION['user_nome']; 
$grupo_views = $_SESSION['user_grupo']; //
$coord_views = $in['coord'];
$setor_views = $in['setor'];
$area_views = $in['area'];
$status = $in['status']; //
$pagina = $in['pag']; //

$nome = explode(" ", $nome_views);
$nome_views = $nome[0] . " " . $nome[1];

$host = "localhost";
$dbname = "cbpf_os";

$Views = new Views();
$Views->id_os = $id_os;
$Views->n_os = $n_os;
$Views->user_views = $user_views;
$Views->nome_views = $nome_views;
$Views->grupo_views = $grupo_views;
$Views->status_os = $status;
$Views->coord_views = $coord_views;
$Views->setor_views = $setor_views;
$Views->area_views = $area_views;
$Views->pagina_views = $pagina;

$PDO = new CN($host, $dbname);
$data = $PDO->registroViews($Views);
// resposta
if ($data > 0) {
	$out['message'] = "Novo Visita.";
} else {
	$out['error'] = true;
    $out['message'] = 'Visita não guardada.';
}

echo json_encode($out);
?>
