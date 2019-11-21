<?php
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

$session = "ON";

if (!isset($_SESSION)) session_start();
if (!isset($_SESSION['user'])) {
    session_destroy();
    $session = 'OFF';
}

$nome = json_decode(file_get_contents("php://input"), true);

$out['session'] = $session;
$out['msg'] = "";
if ($session == 'ON') {
    $ldaphost = "ldap://152.84.50.92";
    $ldaptree = "ou=USUARIOS, o=cbpf, c=br";
    $ldapconn = ldap_connect($ldaphost); // or die("Could not connect to LDAP server.");
    ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

    $ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock,ou=Admin,o=cbpf,c=br', 'Cland3s58nam3n53..');

    $filter="(|(sn=" . trim($nome['nome']) . "*)(givenname=" . trim($nome['nome']) . "*))";
    $justthese = array("mail");
    $search = ldap_search($ldapconn, $ldaptree, $filter, $justthese);
    $info = ldap_get_entries($ldapconn, $search); // retorne as informações
    $total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap
    $out['data'] = $info[0]['mail'][0];
} else {
    $out['msg'] = "Sessão Esgotada. <br >Faça login novamente!";#
}
echo json_encode($out);
?>