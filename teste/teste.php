<?php 
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);


$ldaphost = "ldap://152.84.50.92";
$ldaptree = "ou=USUARIOS, o=cbpf, c=br";
$ldapconn = ldap_connect($ldaphost); // or die("Could not connect to LDAP server.");
ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

$ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock,ou=Admin,o=cbpf,c=br', '************');

// echo hash('sha1', "LeonJohn432", true);
// $filter="uid=denise";
// $justthese = array("sn", "userpassword");
// $search = ldap_search($ldapconn, $ldaptree, $filter, $justthese);
// $info = ldap_get_entries($ldapconn, $search); // retorne as informações
// $total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap

function salt($lenght = 10){
	$salt = NULL;
	$characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for($cont=0;$cont<$lenght;$cont++){
		$salt .= substr($characters, rand(0, strlen($characters)), 1);
	}
	return $salt;
}

if(isset($_REQUEST['bt_salvar'])){
    $user = isset($_REQUEST['nome'])?$_REQUEST['nome']:NULL;
    $filter="uid=$user";
    $justthese = array("sn", "userpassword");
    $search = ldap_search($ldapconn, $ldaptree, $filter, $justthese);
    $info = ldap_get_entries($ldapconn, $search); // retorne as informações
    // $total = ldap_count_entries($ldapconn, $search); // conte o total de resultados do ldap
    $senha = isset($_REQUEST['senha'])?$_REQUEST['senha']:NULL;
    $hash = $info[0]['userpassword'][0];
    $salt = substr(base64_decode(substr($hash,6)),20);
    $ssha = base64_encode(hash('sha1', $senha.$salt, true).$salt);
    $md5 = base64_encode(pack("H*",md5($senha)));
    echo '{SSHA}' . $ssha;
    echo '<br />{MD5}' . $md5;
    echo "<br />" . $info[0]['userpassword'][0];
}


// var_dump($info[0]["userpassword"][0]);
// $user_password = "LeonJohn432";

// if('{MD5}'.base64_encode(pack("H*",md5($user_password)))==$info[0]['userpassword'][0] /*|| '{SSHA}'.base64_encode(hash('sha1', $user_password.$salt), true).$salt==$info[0]['userpassword'][0]*/){
//     echo "<br />teste";
// } else {
//     echo "<br />Falha";
// }
//'{SSHA}'.base64_encode(pack("H*",md5("")))

// echo '{MD5}'.base64_encode(pack("H*",md5("LeonJohn432"))) == $info[0]["userpassword"][0];
// echo '{SSHA}'.base64_(pack("H*",sha1($info[0]['userpassword'][0])));
// echo "<br />";
// echo '{MD5}'.base64_encode(pack("H*",md5("LeonJohn432")));
// echo "<br />";
// echo pack("C*", base64_decode(base64_encode(pack("H*",md5("LeonJohn432")))));

?>

<form name="form" id="form" class="form-horizontal" enctype="multipart/form-data" method="post">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input list='snldap' autocomplete='off' name='nome' id='isnldap' class="form-control" placeholder="Login">                                      
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input id="senha" type="password" class="form-control" name="senha" placeholder="Nova Senha">
                    </div>                    
                    <!-- Button -->
                    <div class="col-sm-12 controls">
                        <button type="submit" id="bt_salvar" name="bt_salvar" class="btn btn-primary pull-right"  value="salvar"><i class="glyphicon glyphicon-save"></i> Salvar</button>
                    </div>
                </form>
