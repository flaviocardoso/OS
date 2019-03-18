<?php
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

//phpinfo();
//echo ini_get('include_path');
$out = array('error' => false);

$user = json_decode(file_get_contents("php://input"), true);

$user_name = "flavioc41";
$user_password = "LeonJohn432";

#LDAP
// parte do connector aqui
$ldaphost = "ldap://152.84.50.92";
$ldapuser = "MAIL";
$ldappass = "Ma8IN9v9..";
$ldapport = 389;
$ldaptree = "ou=USUARIOS, o=cbpf, c=br";
$ldapfilter = "uid=" . $user_name;
/*
$domain = 'mydomain.com';
$username = 'josue.ruiz';
$password = 'pass';
$ldapconfig['host'] = '10.10.10.11';
$ldapconfig['port'] = 389;
$ldapconfig['basedn'] = 'dc=domain,dc=com';
*/	
// connect
$ldapconn = ldap_connect($ldaphost) or die("Could not connect to LDAP server.");
ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

if($ldapconn) {
	echo "OK conexão - 4";
    // binding to ldap server
    $ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock, ou=Admin, o=CBPF, c=BR', 'Cland3s58nam3n53..') or die ("Error trying to bind: ".ldap_error($ldapconn));
    // verify binding
    //if ($ldapbind) {
    $out['message'] = "Run <br>";

    if($ldapbind) {
    	echo "Fun";
    } else {
    	echo "trisyte";
    }
}

if ($ldapbind) {
	//
	if (($search=ldap_search($ldapconn, $ldaptree, $ldapfilter) or die ("Error in search query: ".ldap_error($ldapconn)))){
		$number_returned = ldap_count_entries($ldapconn,$search);
		$info = ldap_get_entries($ldapconn, $search);
		if($info['count']>0 && $info[0]['uid'][0] == $user_name){
			if('{MD5}'.base64_encode(pack("H*",md5($user_password)))==$info[0]['userpassword'][0] || '{SSHA}'.base64_encode(pack("H*",md5($user_password)))==$info[0]['userpassword'][0]){
				//return true;
				echo 1;
				$out['message'] = $out['message'] . 'Sucesso!';
				$out['user'] = uniqid('ang_');
			}else{
				if(strlen($user_name)==0 && strlen($user_password)==0){
					echo 2;
					//$GLOBALS['msg'] = "Autenticação de Administrador";
				}else{
					echo 3;
					//$GLOBALS['msg'] = "Senha inválida";
					$out['error'] = true;
					$out['message'] = $out['message'] . 'USUÁRIO E SENHA NÃO COMPATIVEIS';
				}
			}
		}elseif(strlen($user_name)>0 && $user_name!='login'){
			echo 4;
			//
		#	session_unset();
			$out['error'] = true;
			$out['message'] = $out['message'] . 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
		}
	}else {
		echo 5;
		$out['error'] = true;
		$out['message'] = $out['message'] . 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
	}
}

//$basedn = "ou=USUARIOS, o=cbpf, c=br";
//$filter="uid=" . $user['username'];
/*
if (($search=ldap_search($conectar, $basedn, $filter))){
	$number_returned = ldap_count_entries($conectar,$search);
	$info = ldap_get_entries($conectar, $search);
	if($info['count']>0 && $info[0]['uid'][0] == $user){
		if('{MD5}'.base64_encode(pack("H*",$user['password']))==$info[0]['userpassword'][0] || '{SSHA}'.base64_encode(pack("H*",$user['password']))==$info[0]['userpassword'][0]){
			//return true;
			$out['message'] = 'Sucesso!';
			$out['user'] = uniqid('ang_');
		}else{
			if(strlen($user)==0 && strlen($senha)==0){
				//$GLOBALS['msg'] = "Autenticação de Administrador";
			}else{
				//$GLOBALS['msg'] = "Senha inválida";
				$out['error'] = true;
				$out['message'] = 'USUÁRIO E SENHA NÃO COMPATIVEIS';
			}
		}
	}elseif(strlen($user)>0 && $user!='login'){
		//
	#	session_unset();
		$out['error'] = true;
		$out['message'] = 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
	}
}else {
	$out['error'] = true;
	$out['message'] = 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
}
*/

echo json_encode($out);

?>