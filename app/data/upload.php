<?php
//set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$path_root = $_SERVER["DOCUMENT_ROOT"];
$path_files = "/anexos/";//"/ang3/arquivos/";

$path = $path_root . $path_files;
//$data = json_decode(file_get_contents("php://input"), true);
$path_tmp = "/home/anexos/anexos/";
//$_FILES['arquivo']['name']; teste ok!!!
$file = $_FILES['arquivo'];

//echo $_REQUEST['arquivo'] . '\n';

//echo json_encode($_REQUEST);

//$arquivo = $_FILES['arquivo'];

//$path_root = $_SERVER["DOCUMENT_ROOT"];
//$path_files = "/anexos/";//"/ang3/arquivos/"

//$info = new SplFileInfo($arquivo['name']);
//var_dump($info->getExtension());

$extensao = pathinfo($file['name'], PATHINFO_EXTENSION);
//$extensao = $extensao['extension'];

$nomeDoArquivo = 'file_'.date("Y-m-d_H-i-s").'.'.$extensao;//$info->getExtension();

if (move_uploaded_file($file['tmp_name'], $path_tmp . $nomeDoArquivo)) {
	echo $nomeDoArquivo;
} else {
	echo 'erro';
}

/*
if ($_FILES['arquivo']['name']) {
	if ($path_root . $path_files . $_FILES['arquivo']['name']) != $_FILES['arquivo']['name']) {
		if(move_uploaded_file($_FILES['arquivo']['tmp_name'], $path_root . $path_files . $_FILES['arquivo']['name'])) {
			$link = $_FILES['arquivo']['name'];
			echo $link;
		}
	}else {
		echo "igual";
	}
	// if(move_uploaded_file($_FILES['arquivo']['tmp_name'], $path_root . $path_files . $_FILES['arquivo']['name'])) {
		// $link = $_FILES['arquivo']['name'];
		// echo $link;
	// }
	//echo $_FILES['arquivo']['name'];//$path_root . $path_files . $_FILES['arquivo']['name'];//$_FILES['arquivo']['name'];
}
*/
?>