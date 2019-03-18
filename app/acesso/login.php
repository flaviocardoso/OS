<?php
$out = array('error' => false);

$user = json_decode(file_get_contents("php://input"), true);
//json_encode($user);

//$username = $user->username;
//$password = $user->password;
//trocar path

//echo json_encode($user);


include("CN.php");
$PDO = new CN();
$rwc = $PDO->verfUSER($user['username'], $user['password']);
$flag = $rwc['flag'];
$row = $rwc['rows'];
$count = $rwc['count'];
//echo $count;

if ($flag == 'OK'){
	$out['message'] = 'Sucesso!';
	$out['user'] = uniqid('ang_');	
}
else if ($flag == 'PWORUSERWRONG'){
	$out['error'] = true;
	$out['message'] = 'USUÁRIO E SENHA NÃO COMPATIVEIS';
}
else
{
	$out['error'] = true;
	$out['message'] = 'USUÁRIO NÃO ENCONTRADO NO AUTENTICADOR!';
}

echo json_encode($out);

/*
 $post_data = file_get_contents("php://input");
 $data = json_decode($post_data);
 $result = array();

 $email = $data->email;
 $password = $data->password;

 if ($email == 'f@g.com' && $password == '1234') {
 	$result['on'] = 'ok';
 }else {
 	$result['on'] = 'out';
 }

 
 echo json_encode($result);
*/
?>