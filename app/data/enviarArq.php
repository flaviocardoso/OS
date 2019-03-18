<?php
	set_time_limit(30);
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	
	$arquivo = $_FILES['file'];

	$path_root = $_SERVER["DOCUMENT_ROOT"];
	$path_files = "home/flavio/anexos/";//"/ang3/arquivos/"

	//$info = new SplFileInfo($arquivo['name']);
	//var_dump($info->getExtension());

	$extensao = pathinfo($arquivo['name'], PATHINFO_EXTENSION);

	$nomeDoArquivo = 'file_'.date("Y-m-d_H-i-s").'.'.$extensao;
	
	if (move_uploaded_file($arquivo['tmp_name'], $path_root . $path_files . $nomeDoArquivo)) {
		echo $nomeDoArquivo;
	} else {
		echo 'erro';
	}

?>