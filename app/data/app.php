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
    //$path_root = dirname(dirname(__DIR__));
    require_once("/home/application/vendor/autoload.php");
    //$d = $_REQUEST['d'];

    if (isset($_REQUEST['d'])) {
        $file = "/home/application/data/" . $_REQUEST['d'] . ".php";
        //echo $file;
        if (file_exists($file)) {
            include_once($file);
        } else {
            //echo $file;
            echo "Data - No file exist!";
        }
    } else {
        echo "No query exit!";
    }
} else {
    echo $session;
    header('Location: https://os.cbpf.br/');
}


?>