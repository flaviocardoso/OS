<?php
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");

set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

use lib\Conn\CN;

$PDO = new CN("localhost", "cbpf_os");
$PDO->updateDateOS();
?>