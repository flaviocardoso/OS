<?php
//sobre.php
if (!isset($_SESSION)) session_start();

if (!isset($_SESSION['id'])) {
	session_destroy();
	session_commit();
	// impedir que abra diretamente pelo link - mudança de link requerida
	header("Location: /principal.php"); exit;
}
?>
<p>Sobre</p>