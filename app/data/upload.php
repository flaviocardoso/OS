<?php
//set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$session = 'ON';

if (!isset($_SESSION)) session_start();
if (!isset($_SESSION['user'])) {
    session_destroy();
    $session = 'OFF';
}
$out['session'] = $session;
$out['msg'] = "";
if ($session == 'ON') {
	$path_root = $_SERVER["DOCUMENT_ROOT"];
	$path_files = "/anexos/";

	$path = $path_root . $path_files;
	$path_tmp = "/home/os/anexos/";
	$file = $_FILES['arquivo'];

	$extensao = pathinfo($file['name'], PATHINFO_EXTENSION);
	$nomeDoArquivo = 'file_'.date("Y-m-d_H-i-s").'.'.$extensao;

	if (move_uploaded_file($file['tmp_name'], $path_tmp . $nomeDoArquivo)) {
		$out['data'] = $nomeDoArquivo;
	} else {
		$out['data'] = 'erro';
	}
} else {
	$out['msg'] = "Sessão Esgotada. <br >Faça login novamente!";
}

echo json_encode($out);
?>