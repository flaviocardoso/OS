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
$User->ramal = $IN['ramal'];
$User->coord = $IN['coord'];
$User->ala =  isset($IN['ala']) ? $IN['ala'] : "";
$User->sala = isset($IN['sala']) ? $IN['sala'] : "";
$User->grupo = $IN['grupo'];
$User->setor = isset($IN['setor']) ? $IN['setor'] : "";
$User->area = isset($IN['area']) ? $IN['area'] : "";

$PDO = new CN('localhost', 'cbpf_users');
$r = $PDO->editeUser($User);

switch ($r['user']) {
  case 1:
    echo "Usuário editado!";
    break;

  case 0:
    echo "Usuário não pode ser editado!";
    break;
}

switch ($r['grupo']) {
  case 1:
    echo "<br />Grupo editado";
    break;

  case 0:
    echo "<br />Grupo não editado editado";
    break;
}
?>
