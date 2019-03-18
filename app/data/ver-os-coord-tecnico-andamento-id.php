<?php

$in = json_decode(file_get_contents("php://input"), true);

include("CN.php");
$host = "localhost";
$dbname = "cbpf_os";

$PDO = new CN();
$PDO->connect($host, $dbname);

session_start();
$user_coord = $_SESSION['user_coord'];
$user_setor = $_SESSION['user_setor'];
$user_area = $_SESSION['user_area'];

//echo $in['id'];
//echo $user_coord;

include("OSModelo.php");

$OS = new OSClass();

$OS->id_os = $in['id'];
$OS->dest_coord = $user_coord;
$OS->dest_setor = $user_setor;
$OS->dest_area = $user_area;

$data = $PDO->pegarOSemAndTecnicoId($OS);

foreach ($data['row'] as $key => $value) {
    if ($key == 'data_up') {
        $data_up = new DateTime($value);
        $row["data_up"] = $data_up->format('d/m/Y');
        $row["hora_up"] = $data_up->format('H:i:s A');
    }
    else if ($key == 'data_in') {
        $data_in = new DateTime($value);
        $row["data_in"] = $data_in->format('d/m/Y');
        $row["hora_in"] = $data_in->format('H:i:s A');
    }
    else {
        $row[$key] = $value;
    }
}

echo json_encode($row);

?>
