<?php
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");
$d = $_REQUEST['d'];

if ($d) {
    $file = $path_root . "/app/data/" . $d . ".php";
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
?>