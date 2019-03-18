<?php
// tecnico vê coordenação e setor (visibilidade setor)
use lib\Conn\CN;
use lib\OS\OS;

$user_coord = $_SESSION['user_coord'];
$user_setor = $_SESSION['user_setor'];

$OS = new OS();
$OS->dest_coord = $user_coord;
$OS->dest_setor = $user_setor;

$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN($host, $dbname);
$data_os = $PDO->pegarOSnovaTecnico($OS);
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