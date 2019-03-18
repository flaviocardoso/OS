<?php
session_start();
$user = $_SESSION['user'];
$user_nome = $_SESSION['user_nome'];
$out = array('user' => $user, 'nome' => $user_nome);
echo json_encode($out);

?>