<?php //session_user.php
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");

use lib\Conn\CN;
use lib\Session\Session;
use lib\Session\SessionSol;

$out = array('error' => false);
$in = json_decode(file_get_contents("php://input"), true);

$CN = new CN("localhost", "cbpf_users");
$rwc = $CN->sessionUser($in['user']);
$rows = $rwc['rows'];
$count = $rwc['count'];
$saida = array('user' => $in['user']);

if ($count > 0 && $rows['ativo'] == 1) {
	new Session($rows);	
	$out['uid'] = $in['uid'];
	$out['message'] = $rows['nome']."\n LOGADO!";
}
else {
	$sol = $CN->sessionUserSol($in['user']);
	$rowssol = $sol['rows'];
	$countsol = $sol['count'];

	if ($countsol > 0 && $rowssol['ativo'] == 1) {
		new SessionSol($rowssol);
		$out['uid'] = $in['uid'];
		$out['message'] = "SOL: " . $rowssol['nome']."\n LOGADO!";
	} else {
		$out['error'] = true;
		$out['message'] = 'USUÁRIO NÃO ENCONTRADO NO BANCO DE DADOS DE USUÁRIOS!';
	}	
}
echo json_encode($out);
?>