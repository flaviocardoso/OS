<?php //session_user.php
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");

use lib\Conn\CN;
use lib\Session\Session;
use lib\Session\SessionSol;

$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);
$user;

$CN = new CN("localhost", "cbpf_users");
$rwc = $CN->sessionUser($in['user']);
$rows = $rwc['rows'];
$count = $rwc['count'];
$saida = array('user' => $in['user']);
// usuário com grupo
if ($count > 0 && $rows['ativo'] == 1) {
	new Session($rows);
	list($nome, $sobrenome) = explode(" ", $rows['nome']);
	if ($rows['grupo'] == 'admin' && $rows['S'] == 1) {
		$out['uid'] = $in['uid'];
		$out['message'] = "Admintrador:<br />" . $nome . " " . $sobrenome . "<br />logado!";
	} else {
		$out['error'] = true;
		$out['message'] = 'Adminstrador não autorizado!';
	}
	switch ($rows['grupo']) {
		case 'secr':
			$out['message'] = "Secretária(o):<br />" . $nome . " " . $sobrenome . "<br />logado!";
			break;
		
		case 'resp':			
		case 'tec':
			$out['message'] = "Técnico: " . $nome . " " . $sobrenome . "<br />logado!";
			break;

		case 'sol':
			$out['message'] = "Solicitante: " . $nome . " " . $sobrenome . "<br />logado!";
			break;
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
		$out['message'] = 'Usuário não encontrado!';
	}	
}
echo json_encode($out, JSON_PRETTY_PRINT);
?>