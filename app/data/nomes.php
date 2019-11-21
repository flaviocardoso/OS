<?php

$ldaphost = "ldap://152.84.50.92";
$ldaptree = "ou=USUARIOS, o=cbpf, c=br";
$ldapconn = ldap_connect($ldaphost); // or die("Could not connect to LDAP server.");
ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

$ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock,ou=Admin,o=cbpf,c=br', 'Cland3s58nam3n53..');

$filter="(|(sn=*)(givenname=*))";
$search = ldap_search($ldapconn, $ldaptree, $filter);
$info = ldap_get_entries($ldapconn, $search); // retorne as informações
$total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap

$nomes = array();

for($x=0;$x<$total;$x++){
    $nomes[$x] = $info[$x]['sn'][0];
}

echo json_encode($nomes);
?>