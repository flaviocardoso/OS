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

$dado = $PDO->getOSSimplesNova();
echo $dado['count'] . " ||| <br>";

for ($i = 0; $i < $dado['count']; $i++) // tipo de variável gettype
{
    // echo (strtotime("$data") - strtotime($dado['rows'][$i]['data_up'])) > 172800;
    // echo "|$i |";
    // echo $dado['rows'][$i]['data_in'] == $dado['rows'][$i]['data_up'];
    // echo "\n";
    // echo (strtotime("$data") - strtotime($dado['rows'][$i]['data_up']));
    // echo "<br>";
    // if ($dado['rows'][$i]['data_in'] == $dado['rows'][$i]['data_up'])
    // {
        // echo (strtotime("$data") - strtotime($dado['rows'][$i]['data_up'])) > 172800;
    if ((strtotime("$data") - strtotime($dado['rows'][$i]['data_up'])) > 172800)  // envia o email de ordem de serviço nova atrasada
    {
        echo "|$i | \n";
        // echo $dado['rows'][$i]['data_up'] . "\n->" . $dado['rows'][$i]['id_os'] . "\n<br>";
        $color1 = "#d9534f";
        $id = $dado['rows'][$i]['id_os'];
        // echo $id;
        $PDO->updateColorOS($id, $color1);
    }
    // else
    // {
    //     echo "color diferente |-| <br>";
    //     $color2 = "#5cb85c";
    //     $PDO->updateColorOS($dado['rows'][$i]['id_os'], $color2);
    // }
    // }    
}
// $wc = $PDO->updateDateOS();

// echo $wc;
?>