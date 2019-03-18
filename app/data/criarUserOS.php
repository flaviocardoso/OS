<?php
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
use lib\Modelo\Users;

$IN = json_decode(file_get_contents("php://input"), true);

$User = new Users();
$User->user = $IN['user'];
$User->nome = $IN['nome'];
$User->email = $IN['user'] . "@cbpf.org";
$User->ramal = $IN['ramal'];
$User->coord = $IN['coord'];
$User->ala =  isset($IN['ala']) ? $IN['ala'] : "";
$User->sala = isset($IN['sala']) ? $IN['sala'] : "";
$User->grupo = $IN['grupo'];
$User->setor = isset($IN['setor']) ? $IN['setor'] : "";
$User->area = isset($IN['area']) ? $IN['area'] : "";

$PDO = new CN('localhost', 'cbpf_users');
$count = $PDO->criarUser($User);

if ($count == 0){
    echo "Usuário criado!";
} else {
    echo "Usuário já existe!";
}
?>