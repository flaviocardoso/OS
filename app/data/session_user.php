<?php //session_user.php
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");

use lib\Conn\CN;
use lib\Session\Session;
use lib\Session\SessionSol;

$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);
$user;
$userSuper;

$CN = new CN("localhost", "cbpf_users");
$rwc = $CN->sessionUser($in['user']);
$rows = $rwc['rows'];
$count = $rwc['count'];
$saida = array('user' => $in['user']);
// usuário com grupo
if ($count > 0 && $rows['ativo'] == 1) {
	$flag = true;
	$out['uid'] = $in['uid'];
	list($nome, $sobrenome) = explode(" ", $rows['nome']);
	switch ($rows['grupo']) {
		case 'admin':
		case 'secr':
			$userSuper = ($rows['grupo'] == 'admin') ? "Administrador: " : "Secretária(o): ";
			switch ($rows['S']) {
				case 1:
					$out['message'] = $userSuper . $nome . " " . $sobrenome . "<br />logado!";
					break;
				default:
					$out['uid'] = NULL;
					$out['error'] = true;
					$out['message'] = $userSuper . 'não autorizado!';
					$flag = false;
					break;
			}
			break;

		case 'resp':
		case 'tec':
		case 'sol':
			$user = ($rows['grupo'] == 'sol') ? "Solicitante: " : "Técnico: ";
			$out['message'] = $user . $nome . " " . $sobrenome . "<br />logado!";
			break;
	}
	if (flag) {
		new Session($rows);
	}
}
else {
	$sol = $CN->sessionUserSol($in['user']);
	$rowssol = $sol['rows'];
	$countsol = $sol['count'];
	// usuário sem grupo
	if ($countsol > 0 && $rowssol['ativo'] == 1) {
		new SessionSol($rowssol);
		list($nome, $sobrenome) = explode(" ", $rowssol['nome']);
		$out['uid'] = $in['uid'];
		$out['message'] = "Solicitante: " . $nome . " " . $sobrenome . "<br />logado!";
	} else {
		$out['error'] = true;
		$out['message'] = 'Usuário não autorizado!';
	}
}
echo json_encode($out, JSON_PRETTY_PRINT);
?>
