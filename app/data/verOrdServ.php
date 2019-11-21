<?php
use lib\Conn\CN;
$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN($host, $dbname);
$data_os = $PDO->pegarOS();
$count = $data_os['count'];
$rows = $data_os['rows'];

//$data = new date(format)

/*
cores primárias - HTML
Branco: #FFFFFF - rgb(255, 255, 255) - rgba(255, 255, 255, 1) - hsl(0, 100%, 100%) - hsla(0, 100%, 100%, 1)
Preto: #000000 - rgb(0, 0, 0) - rgba(0, 0, 0, 1) - hsl(0, 100%, 0%)
Vermelho: #FF0000 - rgb(255, 0, 0) - rgba(255, 0, 0, 1) - hsl(0, 100%, 50%)
Verde: #00FF00 - rgb(0, 255, 0) - rgba(0, 255, 0, 1) - hsl(120, 100%, 50%)
Azul = #0000FF - rgb(0, 0, 255) - rgba(0, 0, 255, 1) - hsl(240, 100%, 50%)
Amarelo = #FFFF00 - rgb(255, 255, 0) - rgba(255, 255, 0, 1) - hsl(60, 100%, 50%)
*/

$row = array(); // = array('id_os' => '', 'n_os' => '', 'status' => '', 'solicitante' => '', 'sol_email' => '', 'sol_coord' => '', 'sol_setor' => '', 'sol_ala' => '', 'sol_sala' => '', 'sol_ramal' => '', 'data_in' => '', 'data_up' => '', 'dest_coord' => '', 'dest_setor' => '', 'dest_area' => '', 'file' => '', 'descr_topic' => '', 'descr' => '');

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