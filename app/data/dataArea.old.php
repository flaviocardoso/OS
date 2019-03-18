<?php //dataArea.php

$area = json_decode(file_get_contents("php://input"), true);

include("CN.php");
$host = "localhost";
$dbname = "cbpf_estrutura";

$area_ = "";

if ($area["setor"] == "") {
	session_start();
	$area_ = $_SESSION["user_setor"];
} else {
	$area_ = $area["setor"];
}

$PDO = new CN();
$PDO->connect($host, $dbname);
//fazer função no CN.php
//echo $area["id"]; teste Ok!
$rwc = $PDO->dataAreaBySetor($area_);
$rows = $rwc['rows'];
$count = $rwc['count'];

echo json_encode($rows);
/*
if ($count > 0)
{
	$list = [];
	foreach ($rows as $key => $value) {
		array_push($list, $value);
		//array_push(array, var)
	}

	echo json_encode($list);
}
else
{
	echo json_encode([]);
}
*/
?>