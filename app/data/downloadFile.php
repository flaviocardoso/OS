<?php

set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

if (!isset($_SESSION)) session_start();
//$usuario = $_SESSION['user'];
//$user_email = $_SESSION['email'];
// Verifica se não há a variável da sessão que identifica o usuário
if (!isset($_SESSION['user'])) {
    // Destrói a sessão por segurança
    session_destroy();
    // Redireciona o visitante de volta pro login
    header("Location: /principal.php"); exit;
}

$path_root = $_SERVER["DOCUMENT_ROOT"];
$path_files = "/anexos/";//"/ang3/arquivos/";

$path = $path_root . $path_files;

$file = $_REQUEST['file'];
// mudar pasta de anexo de acordo com server
$path_tmp = "/home/flavio/anexos/";

if (file_exists($path_tmp . $file)) {
    //echo 'existe';
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    header('Content-Type: ' . finfo_file($finfo, $path_tmp . $file));

    header('Content-Disposition: attachment; filename="'. $file . '";filesize="' . filesize($path_tmp . $file).'"');


    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');

    header('Content-Lenght: '.filesize($path_tmp . $file));

    ob_clean();
    flush();
    readfile($path_tmp . $file);
    //echo $path_tmp . $file;
    exit;
}

//echo $file;

?>