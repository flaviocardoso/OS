<?php

set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

session_start();
$area = $_SESSION['user_area'];
$array = explode(",", $area);

echo json_encode($array);
?>