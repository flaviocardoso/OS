<?php

$in = json_decode(file_get_contents("php://input"), true);

use lib\Conn\CN;

$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN($host, $dbname);

$dados = $PDO->pegarLaudoPorId($in['id']);
$count = $dados['count'];
$rows = $dados['row'];

$row = array();

if ($count > 0)
{
	for ($i = 0; $i < $count; $i++) {
		foreach ($rows[$i] as $key => $value) {
			if ($key == 'tec_data') {
				$data = new DateTime($value);
				$row[$i]['data'] = $data->format('d/m/y');
				$row[$i]['hora'] = $data->format('h:i:s A');
			}
			else {
				$row[$i][$key] = $value;
			}
		}	
	}
}
echo json_encode($row);
?>
