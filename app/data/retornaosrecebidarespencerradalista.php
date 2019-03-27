<?php
//display erros
set_time_limit(30);
error_reporting(E_ALL);
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
use lib\Modelo\OS;

$host = "localhost";
$dbname = "cbpf_os";

$OS = new OS();
$OS->dest_coord = $_SESSION['user_coord'];
$OS->dest_setor = $_SESSION['user_setor'];
$PDO = new CN($host, $dbname);
$data_os = $PDO->recebidaOSencerrada($OS);
$count = $data_os['count'];
$rows = $data_os['rows'];
$row = [];

for ($i = 0; $i < $count; $i++) {
	foreach ($rows[$i] as $key => $value) {
		if ($key == 'data_up') {
			$data = new DateTime($value);
			$row[$i][$key] = $data->format('d/m/Y');
			$row[$i]['hora_up'] = $data->format('H:i:s');
		}
		elseif ($key == 'data_in') {
			$data = new DateTime($value);
			$row[$i][$key] = $data->format('d/m/Y');
			$row[$i]['hora_in'] = $data->format('H:i:s');
		}
		else {
			$row[$i][$key] = $value;
		}
	}
}

echo json_encode($row);

?>
