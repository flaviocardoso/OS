<?php
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$path_root = dirname(dirname(__DIR__));
$path_hander = "/app/views/";
$v = $_REQUEST['v'];

if ($v) {
    $file = $path_root . $path_hander . $v . ".php";
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