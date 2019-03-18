<?php
// tecnico vê coordenação e setor (visibilidade setor)

//display erros
error_reporting(-1);
ini_set('display_errors', 'On');

include("CN.php");
$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN();
$PDO->connect($host, $dbname);

// entrar com a coordenação - do usuário na sessão (implementar o coordenação no script cn)

session_start();

$user_coord = $_SESSION['user_coord'];
$user_setor = $_SESSION['user_setor'];

include("OSModelo.php");

$OS = new OSClass();
$OS->dest_coord = $user_coord;
$OS->dest_setor = $user_setor;

$data_os = $PDO->pegarOSEncerrTecnico($OS);
$count = $data_os['count'];
$rows = $data_os['rows'];

for ($i = 0; $i < $count; $i++) {
	foreach ($rows[$i] as $key => $value) {
		if ($key == 'data_up' || $key == 'data_in') {
			$data = new DateTime($value);
			$row[$i][$key] = $data->format('d/m/Y H:i:s');
		}
		else {
			$row[$i][$key] = $value;
		}
	}
	
}

echo json_encode($row);

?>
