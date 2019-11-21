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

$filter="(|(sn=*)(givenname=*))";
$search = ldap_search($ldapconn, $ldaptree, $filter);
$info = ldap_get_entries($ldapconn, $search); // retorne as informações
$total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap
echo "<form name='hostos' method='POST'>";
echo "	<input list='usuariosLDAP' autocomplete='off' name='tf_login' id='tf_login'>
			<datalist id='usuariosLDAP'>";
for($x=0;$x<$total;$x++){
    echo "<option value='" . $info[$x]['uid'][0] . "'></option>";
}
echo "</datalist>";
echo "</form>";
echo "<form name='hostos' method='POST'>";
echo "	<input list='nomesLDAP' autocomplete='off' name='tf_login' id='tf_login'>
			<datalist id='nomesLDAP'>";
for($x=0;$x<$total;$x++){
    echo "<option value='" . $info[$x]['cn'][0] . "'></option>";
}
echo "</datalist>";
echo "</form>";
echo "<form name='hostos' method='POST'>";
echo "	<input list='sobrenomesLDAP' autocomplete='off' name='tf_login' id='tf_login'>
			<datalist id='sobrenomesLDAP'>";
for($x=0;$x<$total;$x++){
    echo "<option value='" . $info[$x]['sn'][0] . "'>" . $x . "</option>";
}
echo "</datalist>";
echo "</form>";

for($x=0;$x<$total;$x++){
    if ("Denise Coutinho de Alcântara Costa" == trim($info[$x]['sn'][0])) {
        echo $x;
    }
}

// var_dump($info[0]['count']);
echo "<br />";
echo("<br />UID: " . $info[0]['uid'][0]);
echo("<br />E-mail: " . $info[0]['mail'][0]);
// echo("<br />Password: " . $info[0]['userpassword'][0]);
echo("<br />Telefone: " . $info[0]['telephonenumber'][0]);
echo("<br />Celular: " . $info[0]['mobile'][0]);
echo("<br />Nome: " . $info[0]['cn'][0]);
echo("<br />Sobrenome: " . $info[0]['sn'][0]);

?>