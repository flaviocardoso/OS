<?php
$IN = json_decode(file_get_contents("php://input"), true);
//var_dump($IN);
$path_root = dirname(dirname(__DIR__));
require_once($path_root . "/app/lib/dompdf/src/Autoloader.php");
Dompdf\Autoloader::register();

// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();
$dompdf->loadHtml('
<!doctype html>
<html>
<head>
<style>
table, th, td {
    border: 1px solid black;
    border-colllapse: collapse;
}
th, td {
    padding: 10px;
}
</style>
<script>
</script>
</head>
<body>
<table style="width: 100%;">
    <th style="text-align: center;">ORDEM DE SERVIÇO</th>
</table>
<p></p>
<table style="width: 100%;">    
    <tbody>
        <tr>
            <td colspan="1">PROTOCOLO</td>
        
            <td>' . $IN['order']['n_os'] . '</td>
        </tr>
        <tr>
            <td colspan="1">STATUS</td>
        
            <td>' . $IN['order']['status'] . '</td>
        </tr>
        <tr>
            <td colspan="1">SETOR</td>
        
            <td>' . $IN['order']['dest_setor'] . '</td>
        </tr>
        <tr>
            <td colspan="1">AREA</td>
        
            <td>' . $IN['order']['dest_area'] . '</td>
        </tr>
        <tr>
            <td rowspan="2">CRIAÇÃO</td>  
            <td>Data: ' . $IN['order']['data_in'] . '</td>
        </tr>
        <tr>
            <td>Hora: ' . $IN['order']['hora_in'] . '</td>
        </tr>
        <tr>
            <td rowspan="2">MODICAÇÃO</td>  
            <td>Data: ' . $IN['order']['data_up'] . '</td>
        </tr>
        <tr>
            <td>Hora: ' . $IN['order']['hora_up'] . '</td> 
        </tr>   
</table>
<p></p>
<table style="width: 100%">
    <thead>
       <td rowspan="5">SOLICITANTE</td> 
    </thead>
    <tbody>
        <tr>
            <td>Nome: ' . $IN['order']['solicitante'] . '</td>
        </tr>
        <tr>
            <td>Email: ' . $IN['order']['sol_email'] . '</td>
        </tr>
        <tr>
            <td>Coordenação: ' . $IN['order']['sol_coord'] . '</td>
        </tr>
        <tr>
             <td>Ala: ' . $IN['order']['sol_ala'] . '</td>
        </tr>
        <tr>
            <td>Sala: ' . $IN['order']['sol_sala'] . '</td>
        </tr>        
    </tbody>    
</table>
<p></p>
<table style="width: 100%;">
    <th style="text-align: center;">ORDEM DE SERVIÇO</th>
</table>
<p></p>
<table style="width: 100%">
    <thead>
        <td rowspan="2">DESCRIÇÃO</td>
    <thead>
    <tbody>
        <tr>
            <td>' . $IN['order']['descr_topic'] . '</td>
        </tr>
        <tr>
            <td>' . $IN['order']['descr'] . '</td>
        </tr>
    </tbody>
</table>
</body>
</html>');

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'landscape');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream(
    "saida.pdf", /* Nome do arquivo de saída */
    array(
        "Attachment" => true /* Para download, altere para true */
    )
);


?>