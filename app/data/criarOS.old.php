<?php //criarOS.php
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
include_once $_SERVER['DOCUMENT_ROOT'] . '/autoload.php';

$OSin = json_decode(file_get_contents("php://input"), true);

//echo json_encode($OSin); teste OK!
//resposta em os
/*
os['sol'] -> solicitante
os['sol_email'] -> email do solicitante
os['sol_coord'] -> coordenação do solicitante
os['sol_setor'] -> setor do solicitante
os['sol_ala'] -> ala do solicitante
os['sol_sala'] -> sala do solicitante
os['sol_ramal'] -> ramal do solicitante
os['dest_coord'] -> coordenação da destinação
os['dest_setor'] -> setor da destinação
os['dest_area'] -> area da destinação
os['descr'] -> descrição da ordem de serviço
*/
//echo $nome;
//echo $OSin->arquivo;
//echo $OSin['arquivo'];

$host = "localhost";
$dbname = "cbpf_os";

$PDO = new Conn_CN();
$PDO->connect($host, $dbname);
$dt = new DateTime('now', new DateTimeZone('America/Sao_Paulo'));
$dh = $dt->format('Y-m-d H:i:s');
if (intval(date('n')) > 6) {
	$n_os = "2".$dt->format('ymdHis');
} else {
	$n_os = "1".$dt->format('ymdHis');
}

$solicitante = explode(" ", $OSin['sol']);
$solicitante = $solicitante[0] . " " . $solicitante[1];

// modificar aqui para receber o user e o email (o email vai receber as notificações 24/01/2019
/*
$sol_user = $in['user']; // user para carragamento de dados do usuário
$sol_email_noticication = $in['email']; // email de destinação das notificações da ordem de serviço criada
$dest_coord = $in['dest_coord'];
$dest_setor = $in['dest_setor'];
$dest_area = $in['dest_area'];
$file = $in['arq'];
$topico = $in['descr_topic'];
$descr = $in['descr'];
$criador = $_SESSION['user']; // user de adminstador criador da ordem de serviço
$criador_email = $_SESSION['user_email']; // email de adminstrador criador da ordem de serviço
*/

include("OSModelo.php");
$OS = new OSClass();
$OS->n_os = $n_os; //"numero da ordem de serviço" - fornecer um número de ordem de serviço automático
$OS->cor_os = '#FFFFFF';
$OS->status = "NOVA"; //"status inicial da ordem de serviço"
// -- info inicio
$OS->solicitante = $solicitante; //"nome do solicitante"
$OS->sol_email = $OSin['sol_email']; //"email do solicitante"
$OS->sol_coord = $OSin['sol_coord']; //"coordenação do solicitante"
$OS->sol_setor = $OSin['sol_setor']; //"setor do solicitante"
$OS->sol_ala = $OSin['sol_ala']; //"ala do solicitante"
$OS->sol_sala = $OSin['sol_sala']; //"sala do solicitante";
$OS->sol_ramal = $OSin['sol_ramal']; //"ramal do solicitante"
// -- info fim
$OS->data_in = $dh; //"data inicial da criação da ordem de serviço"
$OS->data_up =  $dh; //"data de atualização da ordem de serviço";
$OS->dest_coord = $OSin['dest_coord']; //"coordenação de destinação da ordem de serviço"
$OS->dest_setor = $OSin['dest_setor']; //"setor de destinação da ordem de serviço"
$OS->dest_area = $OSin['dest_area']; //"area de destinação da ordem de serviço
$OS->file = $OSin['arq']; //"link para arquivo de descrição do problema"
//$OS->file = $OSin['arquivo']; //"link para arquivo de descrição do problema"
$OS->descr_topic = $OSin['descr_topic']; // topico de direção para descrição
$OS->descr = $OSin['descr']; //"descrição do problema apresentado"
$OS->criador = $_SESSION['user']; //"user ou nome do criador na atual ordem de serviço"
$OS->criador_email = $_SESSION['user_email']; //"email do criador da ordem de servoço"

$wc = $PDO->criarOS($OS);
//echo $OS->file;
$count = $wc['count'];

if ($count > 0) {
	echo "Ordem de serviço criada";
}
else {
	echo "Ordem de serviço não criada";
}

?>