<?php
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/vendor/autoload.php");

set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

use lib\Conn\CN;

$data = date('Y-m-d');

$PDO = new CN("localhost", "cbpf_os");

$dado = $PDO->getOSSimplesAndamento();

for ($i = 0; $i < $dado['count']; $i++) // tipo de variável gettype
{    
    $time = strtotime("$data") - strtotime($dado['rows'][$i]['data_up']);
    if ($time > 518400)  // envia o email de ordem de serviço nova atrasada
    {
        $color1 = "#d9534f";
        $id = $dado['rows'][$i]['id_os'];
        $PDO->updateColorOS($id, $color1);
    }
    elseif ($time > 259200)
    {
        $color2 = "#f0ad4e";
        $PDO->updateColorOS($dado['rows'][$i]['id_os'], $color2);
    }
}

?>