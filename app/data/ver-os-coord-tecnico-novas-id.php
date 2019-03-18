<?php

$in = json_decode(file_get_contents("php://input"), true);

use lib\Conn\CN;
use lib\OS\OS;

$user_coord = $_SESSION['user_coord'];
$user_setor = $_SESSION['user_setor'];
$user_area = $_SESSION['user_area'];

$OS = new OS();
$OS->id_os = $in['id'];
$OS->dest_coord = $user_coord;
$OS->dest_setor = $user_setor;
$OS->dest_area = $user_area;


$PDO = new CN("localhost", "cbpf_os");
$rows = $PDO->pegarOSnovaTecnicoId($OS);
$row = [];

foreach ($rows['row'] as $key => $value) {
    if ($key == 'data_up') {
        $data_up = new DateTime($value);
        $row[$key] = $data_up->format('d/m/Y');
        $row['hora_up'] = $data_up->format('H:m:i');
    }
    elseif ($key == 'data_in') {
        $data_in = new DateTime($value);
        $row[$key] = $data_in->format('d/m/Y');
        $row["hora_in"] = $data_in->format('H:m:i');
    }
    else {
        $row[$key] = $value;
    }
}

echo json_encode($row);
?>
