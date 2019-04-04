<?php

set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

session_start();
$setor = $_SESSION['user_setor'];
$array = explode(",", $setor);

echo json_encode($array);
//echo $setor;

?>