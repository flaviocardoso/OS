<?php //data-coordenações
use lib\Conn\CN;

$PDO = new CN( "localhost", "cbpf_estrutura");
$rwc = $PDO->dataCoord();
$rows = $rwc['rows'];
$count = $rwc['count'];

echo json_encode($rows);
?>