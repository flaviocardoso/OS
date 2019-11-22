<?php
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$path_root = dirname(dirname(__DIR__));
$path_hander = "/home/application/session/";//app/views/";
$s = $_REQUEST['s'];

if ($s) {
    $file = $path_hander . $s . ".php"; //$path_root . $path_hander . $v . ".php";
    //switch para mapa de páginas
    if (file_exists($file)) {
        include($file);
    } else {
        //echo $file;
        echo "No file exist!";
    }
} else {
    echo "No query exit!";
}

?>