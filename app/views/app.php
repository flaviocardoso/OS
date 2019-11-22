<?php
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$session = "ON";

if (!isset($_SESSION)) session_start();
if (!isset($_SESSION['user'])) {
    session_destroy();
    $session = 'OFF';
}

if ($session == 'ON') {
    $path_root = dirname(dirname(__DIR__));
    $path_hander = "/home/application/views/";//app/views/";
    $v = $_REQUEST['v'];

    if ($v) {
        $file = $path_hander . $v . ".php"; //$path_root . $path_hander . $v . ".php";
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
} else {
    echo "Página não pode ser acessada! Recarrege a página.";
}

?>