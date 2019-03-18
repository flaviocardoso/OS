<?php //dataSetor.php

$coord = json_decode(file_get_contents("php://input"), true);

//echo json_encode($coord);

include("CN.php");
$host = "localhost";
$dbname = "cbpf_estrutura";

$coord_ = "";

if ($coord["coord"] == "") {
	session_start();
	$coord_ = $_SESSION["user_coord"];
} else {
	$coord_ = $coord["coord"];
}

$PDO = new CN();
$PDO->connect($host, $dbname);
//fazer função no CN.php
//echo $setor["id"]; teste Ok!
$rwc = $PDO->dataSetorByCoord($coord_);
$rows = $rwc['rows'];
$count = $rwc['count'];


//echo $rows;
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
	echo "error";
}
*/
?>