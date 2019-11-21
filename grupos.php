<?php

$ldaphost = "ldap://152.84.50.92";
$ldaptree = "ou=USUARIOS, o=cbpf, c=br";
$ldapconn = ldap_connect($ldaphost); // or die("Could not connect to LDAP server.");
ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

// usuários
// $filter="uid=".$formAlterarUsuario['login'];
// $search=ldap_search($conectar, $basedn, $filter);
// $number_returned = ldap_count_entries($conectar,$search);

$ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock,ou=Admin,o=cbpf,c=br', 'Cland3s58nam3n53..');

$filter="(&(cn=*)(member=*))"; //$filter="(|(sn=*)(givenname=*))";
$search = ldap_search($ldapconn, $ldaptree, $filter);
$info = ldap_get_entries($ldapconn, $search); // retorne as informações
$total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap
// echo "<form name='hostos' method='POST'>";
// echo "	<input list='usuariosLDAP' autocomplete='off' name='tf_login' id='tf_login'>
			// <datalist id='usuariosLDAP'>";
for($x=0;$x<$total;$x++){
    // echo "<option value='" . $x . "'>" . $info[$x]['member'][0] . "</option>";
    echo "<br />";
    echo "Grupo: <br />";
    echo $info[$x]['cn'][0];
    echo "<br />Usuários: <br />";
    var_dump(implode($info[$x]['member'],'|'));
    echo "<br />";
}
// echo "</datalist>";
// echo "</form>";

?>