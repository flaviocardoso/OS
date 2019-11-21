<?php
set_time_limit(30);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

function salt($lenght = 10){
	$salt = NULL;
	$characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for($cont=0;$cont<$lenght;$cont++){
		$salt .= substr($characters, rand(0, strlen($characters)), 1);
	}
	return $salt;
}

$out = array('error' => false);

$user = json_decode(file_get_contents("php://input"), true);

$user_name = $user['username'];
$user_ = explode("@", $user_name);
if (count($user_) > 1 && $user_[1] == "cbpf.br") {
	$user_name = $user_[0];
}
$user_password = $user['password'];

#LDAP
// parte do connector aqui
$ldaphost = "ldap://152.84.50.92";
$ldapuser = "MAIL";
$ldappass = "Ma8IN9v9..";
$ldapport = 389;
$ldaptree = "ou=USUARIOS, o=cbpf, c=br";
$ldapfilter = "uid=" . $user_name;
$justthese = array("uid", "userpassword");
	
// connect
$ldapconn = ldap_connect($ldaphost); // or die("Could not connect to LDAP server.");
ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

if($ldapconn) {
	// echo "OK conexão - 4"; cn=Mr Spock,ou=Admin,o=cbpf,c=br star..trek
    // binding to ldap server cn=Mr Spock, ou=Admin, o=CBPF, c=BR Cland3s58nam3n53..
    $ldapbind = ldap_bind($ldapconn, 'cn=Mr Spock,ou=Admin,o=cbpf,c=br', 'Cland3s58nam3n53..'); // or die ("Error trying to bind: ".ldap_error($ldapconn));
    
} else {
	$out['error'] = true;
	echo "Não foi possível se conectar com o servidor LDAP";
}

if ($ldapbind) {
	//
	if (($search=ldap_search($ldapconn, $ldaptree, $ldapfilter, $justthese) or die ("Error in search query: ".ldap_error($ldapconn)))){
		$number_returned = ldap_count_entries($ldapconn,$search);
		$info = ldap_get_entries($ldapconn, $search);
		$hash = $info[0]['userpassword'][0];
		$salt = substr(base64_decode(substr($hash,6)),20);
		if($info[0]['uid'][0] == $user_name){
			if('{MD5}'.base64_encode(pack("H*",md5($user_password)))==$info[0]['userpassword'][0] || "{SSHA}".base64_encode(hash('sha1',$user_password.$salt, true).$salt)==$info[0]['userpassword'][0]){
				//return true;
				// echo 1;
				//echo "teste";
				$out['message'] = 'Sucesso!';
				$out['user'] = uniqid('ang_');
			}else{
				if(strlen($user_name)==0 && strlen($user_password)==0){
					// echo 2;
					//$GLOBALS['msg'] = "Autenticação de Administrador";
				}else{
					// echo 3;
					//$GLOBALS['msg'] = "Senha inválida";
					$out['error'] = true;
					$out['message'] = 'USUÁRIO E SENHA NÃO COMPATIVEIS';
				}
			}
		}elseif(strlen($user_name)>0 && $user_name!='login'){
			// echo 4;
			//
		#	session_unset();
			$out['error'] = true;
			$out['message'] = 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
		}
	}else {
		// echo 5;
		$out['error'] = true;
		$out['message'] = 'ERRO NO AUTENTICADOR!';
	}
} else {
	$out['error'] = true;
	echo "Não foi possível se conectar com o servidor LDAP";
}

echo json_encode($out);

?>